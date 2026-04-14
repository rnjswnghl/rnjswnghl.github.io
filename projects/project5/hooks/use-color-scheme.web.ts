import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const scheme = useRNColorScheme();

  if (hydrated) {
    return scheme;
  }

  return "light";
}
