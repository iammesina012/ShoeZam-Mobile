import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PersistenceError,
  PersistenceState,
  PersistenceStatus,
} from "@/types";

type PersistentStateResult<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  persistence: PersistenceState;
};

export function usePersistentState<T>(
  storageKey: string,
  initialValue: T,
  restoreValue?: (storedValue: unknown) => T,
): PersistentStateResult<T> {
  const [value, setValue] = useState(initialValue);
  const [loadStatus, setLoadStatus] =
    useState<Exclude<PersistenceStatus, "error">>("loading");
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saveRetrying, setSaveRetrying] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saveAttempt, setSaveAttempt] = useState(0);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let isActive = true;

    async function loadValue() {
      try {
        const storedValue = await AsyncStorage.getItem(storageKey);

        if (storedValue !== null) {
          const parsedValue: unknown = JSON.parse(storedValue);
          const restoredValue = restoreValue
            ? restoreValue(parsedValue)
            : (parsedValue as T);
          if (isActive) setValue(restoredValue);
        }

        if (isActive) {
          setLoadError(false);
          setLoadStatus("ready");
        }
      } catch (error) {
        console.error(`Unable to load saved data for "${storageKey}":`, error);
        if (isActive) {
          setLoadError(true);
          setLoadStatus("ready");
        }
      }
    }

    void loadValue();

    return () => {
      isActive = false;
    };
  }, [loadAttempt, restoreValue, storageKey]);

  useEffect(() => {
    if (loadStatus !== "ready" || loadError) return;

    let isActive = true;
    writeQueue.current = writeQueue.current
      .then(() => {
        const serializedValue = JSON.stringify(value);
        if (serializedValue === undefined) {
          throw new Error(
            `Saved data for "${storageKey}" could not be serialized.`,
          );
        }

        return AsyncStorage.setItem(storageKey, serializedValue);
      })
      .then(() => {
        if (isActive) {
          setSaveError(false);
          setSaveRetrying(false);
        }
      })
      .catch((error: unknown) => {
        console.error(
          `Unable to serialize or save data for "${storageKey}":`,
          error,
        );
        if (isActive) {
          setSaveError(true);
          setSaveRetrying(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [loadError, loadStatus, saveAttempt, storageKey, value]);

  const retry = useCallback(() => {
    if (loadError) {
      setLoadError(false);
      setLoadStatus("loading");
      setLoadAttempt((attempt) => attempt + 1);
      return;
    }

    if (saveError) {
      setSaveRetrying(true);
      setSaveAttempt((attempt) => attempt + 1);
    }
  }, [loadError, saveError]);

  const error: PersistenceError | null = loadError
    ? "load"
    : saveError
      ? "save"
      : null;
  const status: PersistenceStatus =
    loadStatus === "loading" || saveRetrying
      ? "loading"
      : error
        ? "error"
        : "ready";

  return {
    value,
    setValue,
    persistence: { status, error, retry },
  };
}
