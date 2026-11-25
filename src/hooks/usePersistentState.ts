import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PersistenceState, PersistenceStatus } from "@/types";

type PersistentStateResult<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  persistence: PersistenceState;
};

export function usePersistentState<T>(
  storageKey: string,
  initialValue: T,
): PersistentStateResult<T> {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<PersistenceStatus>("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let isActive = true;

    async function loadValue() {
      try {
        const storedValue = await AsyncStorage.getItem(storageKey);

        if (storedValue !== null) {
          const parsedValue: T = JSON.parse(storedValue);
          if (isActive) setValue(parsedValue);
        }

        if (isActive) setStatus("ready");
      } catch (error) {
        console.error(`Unable to load saved data for "${storageKey}":`, error);
        if (isActive) setStatus("error");
      }
    }

    void loadValue();

    return () => {
      isActive = false;
    };
  }, [loadAttempt, storageKey]);

  useEffect(() => {
    if (status !== "ready") return;

    try {
      const serializedValue = JSON.stringify(value);
      if (serializedValue === undefined) {
        throw new Error(`Saved data for "${storageKey}" could not be serialized.`);
      }

      writeQueue.current = writeQueue.current
        .then(() => AsyncStorage.setItem(storageKey, serializedValue))
        .catch((error: unknown) => {
          console.error(`Unable to save data for "${storageKey}":`, error);
        });
    } catch (error) {
      console.error(`Unable to serialize data for "${storageKey}":`, error);
    }
  }, [status, storageKey, value]);

  const retry = useCallback(() => {
    setStatus("loading");
    setLoadAttempt((attempt) => attempt + 1);
  }, []);

  return {
    value,
    setValue,
    persistence: { status, retry },
  };
}
