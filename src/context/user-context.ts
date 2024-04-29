import { createContext } from "react";
import { ContextType } from "@/types";

interface UserContextType {
  context: ContextType;
  setContext: (context: ContextType) => void;
}

export const UserContext = createContext<UserContextType>({
  context: { languageChoice: "en" },
  setContext: function (context: ContextType): void {
    throw new Error("Function not implemented.");
  },
});
