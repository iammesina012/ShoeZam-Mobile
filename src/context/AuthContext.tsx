import { getSupabaseClient, supabaseClient, supabaseConfigError } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AppState, Platform } from "react-native";

type AuthStatus = "loading" | "ready" | "error";

type AuthContextValue = {
  session: Session | null;
  status: AuthStatus;
  initializationError: string | null;
  canRetryInitialization: boolean;
  retryInitialization: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  exchangeCodeForSession: (code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>(
    supabaseClient ? "loading" : "error",
  );
  const [initializationError, setInitializationError] = useState<string | null>(
    supabaseConfigError,
  );
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const client = supabaseClient;
    if (!client) return;

    let isActive = true;

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!isActive) return;
      setSession(nextSession);
      setInitializationError(null);
      setStatus("ready");
    });

    const appStateSubscription =
      Platform.OS === "web"
        ? null
        : AppState.addEventListener("change", (nextAppState) => {
            if (nextAppState === "active") {
              void client.auth.startAutoRefresh();
            } else {
              client.auth.stopAutoRefresh();
            }
          });

    if (Platform.OS !== "web" && AppState.currentState === "active") {
      void client.auth.startAutoRefresh();
    }

    client.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isActive) return;

        if (error) {
          setInitializationError(error.message);
          setStatus("error");
          return;
        }

        setSession(data.session);
        setInitializationError(null);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!isActive) return;

        setInitializationError(
          error instanceof Error
            ? error.message
            : "Unable to restore your Supabase session.",
        );
        setStatus("error");
      });

    return () => {
      isActive = false;
      subscription.unsubscribe();
      appStateSubscription?.remove();
    };
  }, [retryCount]);

  const retryInitialization = useCallback(() => {
    if (!supabaseClient) return;

    setInitializationError(null);
    setStatus("loading");
    setRetryCount((currentCount) => currentCount + 1);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithPassword({ email, password });

    if (error) throw error;
  }, []);

  const signUp = useCallback(
    async (fullName: string, email: string, password: string) => {
      const client = getSupabaseClient();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: Linking.createURL("auth/callback"),
        },
      });

      if (error) throw error;

      return data.session !== null;
    },
    [],
  );

  const signOut = useCallback(async () => {
    const client = getSupabaseClient();
    const { error } = await client.auth.signOut({ scope: "local" });

    if (error) throw error;
  }, []);

  const exchangeCodeForSession = useCallback(async (code: string) => {
    const client = getSupabaseClient();
    const { error } = await client.auth.exchangeCodeForSession(code);

    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        status,
        initializationError,
        canRetryInitialization: supabaseClient !== null,
        retryInitialization,
        signIn,
        signUp,
        signOut,
        exchangeCodeForSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
