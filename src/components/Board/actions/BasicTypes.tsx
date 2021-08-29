export type Coords = {
  x: number;
  y: number;
};

export const DefaultCoords: Coords = {
  x: 0,
  y: 0,
};

export type CanvasObjects = {};

export type CanvasProperties = {};

export type RedrawCanvas = (objects: number[]) => void;
