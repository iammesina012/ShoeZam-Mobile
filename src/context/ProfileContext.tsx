import type { ProfileContextType, UserProfile } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const INITIAL_PROFILE: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  photoUri: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  function updateProfile(updatedProfile: UserProfile) {
    setProfile(updatedProfile);
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
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
