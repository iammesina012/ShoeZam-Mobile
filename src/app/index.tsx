import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { session } = useAuth();

  return <Redirect href={session ? "/tabs" : "/login"} />;
}
