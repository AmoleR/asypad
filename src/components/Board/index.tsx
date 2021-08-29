import { FC, useContext, useEffect, useRef } from "react";
import { ButtonContext } from "context";
import ActionHandler from "./actions";

type Coords = { x: number; y: number };

const Board: FC<{}> = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { current: selected } = useContext(ButtonContext);

  const canvasObjects = useRef({});
  const canvasProperties = useRef({});

  useEffect(() => {
    const actionHandler = new ActionHandler(
      canvas,
      canvasObjects,
      canvasProperties,
      () => {}
    );
    actionHandler.registerActionHandlers();

    return actionHandler.cleanupActionHandlers;
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={canvas} />;
};

export default Board;
