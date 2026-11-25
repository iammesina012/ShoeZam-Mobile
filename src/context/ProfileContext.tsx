import type { ProfileContextType, UserProfile } from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import { createContext, useContext, type ReactNode } from "react";

const INITIAL_PROFILE: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  photoUri: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:profile:v1";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const {
    value: profile,
    setValue: setProfile,
    persistence,
  } = usePersistentState(STORAGE_KEY, INITIAL_PROFILE);

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
