export default function removeKeys<T extends string | number | symbol, U>(
  obj: Record<T, U>,
  keys: T[]
): Record<T, U> {
  let target = {} as Record<T, U>;

  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}
