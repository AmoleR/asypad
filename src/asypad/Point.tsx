export default class Point {
  constructor(private _x: number, private _y: number, private _label: string) {}

  static fromCoords(x: number, y: number): Point {
    return new Point(x, y, "");
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get coords(): [number, number] {
    return [this.x, this.y];
  }

  get label(): string {
    return this._label;
  }

  get component(): JSX.Element {
    return <circle cx={this.x} cy={this.y} r={3} />;
  }
}
