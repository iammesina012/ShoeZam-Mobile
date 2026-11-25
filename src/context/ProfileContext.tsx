import type { ProfileContextType, UserProfile } from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import { createContext, useContext, type ReactNode } from "react";

const INITIAL_PROFILE: UserProfile = {
  fullName: "",
  username: "",
  email: "",
  mobileNumber: "",
  photoUri: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:profile:v1";

function restoreProfile(savedValue: unknown): UserProfile {
  if (
    typeof savedValue !== "object" ||
    savedValue === null ||
    Array.isArray(savedValue)
  ) {
    throw new Error("Saved profile data has an invalid format.");
  }

  const savedProfile = savedValue as Record<string, unknown>;
  const legacyFullName = [savedProfile.firstName, savedProfile.lastName]
    .filter((name): name is string => typeof name === "string")
    .join(" ");

  return {
    fullName:
      typeof savedProfile.fullName === "string"
        ? savedProfile.fullName
        : legacyFullName,
    username: typeof savedProfile.username === "string" ? savedProfile.username : "",
    email: typeof savedProfile.email === "string" ? savedProfile.email : "",
    mobileNumber:
      typeof savedProfile.mobileNumber === "string"
        ? savedProfile.mobileNumber
        : "",
    photoUri: typeof savedProfile.photoUri === "string" ? savedProfile.photoUri : null,
  };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const {
    value: profile,
    setValue: setProfile,
    persistence,
  } = usePersistentState(STORAGE_KEY, INITIAL_PROFILE, restoreProfile);

  function updateProfile(updatedProfile: UserProfile) {
    setProfile(updatedProfile);
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, persistence }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return context;
}
