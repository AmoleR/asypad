import { createContext } from "react";

const ButtonContext = createContext<{
  current: string;
  setCurrent: (newValue: string) => void;
}>({ current: "Move", setCurrent: () => {} });

export { ButtonContext };
