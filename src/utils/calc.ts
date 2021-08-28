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
  main: HTMLDivElement | null
): number {
  if (!main) return 0;

  let baseSize: number = 0;
  switch (unit) {
    case ScreenSizes.VH:
      baseSize = main.clientHeight;
      break;
    case ScreenSizes.VW:
      baseSize = main.clientWidth;
      break;
    case ScreenSizes.VMAX:
      baseSize = Math.max(main.clientHeight, main.clientWidth);
      break;
    case ScreenSizes.VMIN:
      baseSize = Math.min(main.clientHeight, main.clientWidth);
      break;
    case ScreenSizes.PX:
      baseSize = 100;
      break;
  }

  return (value / 100) * baseSize;
}
