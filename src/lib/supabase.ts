import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const projectUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const webStorage = {
  getItem: async (key: string) =>
    typeof window === "undefined" ? null : window.localStorage.getItem(key),
  setItem: async (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

const authStorage = Platform.OS === "web" ? webStorage : AsyncStorage;

let supabaseClient: SupabaseClient | null = null;
let supabaseConfigError: string | null = null;

if (!projectUrl || !publishableKey) {
  supabaseConfigError =
    "Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY in .env.local, then restart Expo.";
} else {
  try {
    supabaseClient = createClient(projectUrl, publishableKey, {
      auth: {
        storage: authStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        flowType: "pkce",
      },
    });
  } catch (error) {
    supabaseConfigError =
      error instanceof Error
        ? `Supabase could not be configured: ${error.message}`
        : "Supabase could not be configured. Check the project URL and publishable key.";
  }
}

export { supabaseClient, supabaseConfigError };

export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error(
      supabaseConfigError ?? "Supabase authentication is unavailable.",
    );
  }

  return supabaseClient;
}
