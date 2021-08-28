export enum ScreenSizes {
  VH,
  VW,
  VMIN,
  VMAX,
  PX,
}

export function pxToViewportLength(
  value: number,
  unit: ScreenSizes,
  window: Window
): number {
  let baseSize: number = 0;
  switch (unit) {
    case ScreenSizes.VH:
      baseSize = window.innerHeight;
      break;
    case ScreenSizes.VW:
      baseSize = window.innerWidth;
      break;
    case ScreenSizes.VMAX:
      baseSize = Math.max(window.innerWidth, window.innerHeight);
      break;
    case ScreenSizes.VMIN:
      baseSize = Math.min(window.innerWidth, window.innerHeight);
      break;
    case ScreenSizes.PX:
      baseSize = 100;
      break;
  }

  return (value / 100) * baseSize;
}
