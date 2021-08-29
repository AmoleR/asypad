import { createContext } from "react";
import { AsyPadActions } from "asypad";

const ButtonContext = createContext<{
  current: AsyPadActions;
  setCurrent: (newValue: AsyPadActions) => void;
}>({ current: "Move", setCurrent: () => {} });

export { ButtonContext };
