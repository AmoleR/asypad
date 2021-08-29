import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  return e.type.startsWith("t");
}

export function isReactTouchEvent(
  e: ReactMouseEvent | ReactTouchEvent
): e is ReactTouchEvent {
  return e.type.startsWith("t");
}
