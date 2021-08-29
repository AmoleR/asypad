/**
 * Defined actions:
 *  -   Move
 *  -   Select
 *  -   Global (i.e. Zoom (2 finger/Wheel), Context Menu, etc.)
 */

import { MutableRefObject } from "react";
import { CanvasObjects, CanvasProperties, RedrawCanvas } from "./BasicTypes";

export default class ActionHandler {
  constructor(
    private canvas: MutableRefObject<HTMLCanvasElement | null>,
    private canvasObjects: MutableRefObject<CanvasObjects>,
    private canvasProperties: MutableRefObject<CanvasProperties>,
    private redrawCanvas: RedrawCanvas
  ) {}

  private waitForCanvas(
    callback: () => unknown,
    time: number = 5000,
    interval: number = 100,
    accumulatedTime: number = 0
  ) {
    if (this.canvas && this.canvas.current) callback();
    else
      setTimeout(
        () =>
          this.waitForCanvas(
            callback,
            time,
            interval,
            accumulatedTime + interval
          ),
        interval
      );
  }

  public registerActionHandlers() {}

  public cleanupActionHandlers() {}
}
