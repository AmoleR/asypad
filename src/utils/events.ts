export function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  return e.type.startsWith("t");
}
