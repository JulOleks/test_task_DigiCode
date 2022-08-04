import BaseShape from "./baseShape";

export default class FlexibleShape extends BaseShape {
  constructor(sides = 5, angle = 9, innerRadius = 30, outerRadius = 10) {
    super();

    this.sides = sides;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.agnle = angle;

    this.createShape();
  }

  createShape() {
    const { x, y } = this.position;

    const step = (Math.PI * 2) / this.sides;
    const halfStep = step / 2;
    const qtrStep = step / 4;
    const start = (this.angle / 180) * Math.PI;
    let n, dx, dy, cx, cy;

    this.beginFill(`0x${this.color}`);
    this.moveTo(
      x + Math.cos(start) * this.outerRadius,
      y - Math.sin(start) * this.outerRadius
    );

    for (n = 1; n <= this.sides; ++n) {
      cx =
        x +
        Math.cos(start + step * n - qtrStep * 3) *
          (this.innerRadius / Math.cos(qtrStep));
      cy =
        y -
        Math.sin(start + step * n - qtrStep * 3) *
          (this.innerRadius / Math.cos(qtrStep));
      dx = x + Math.cos(start + step * n - halfStep) * this.innerRadius;
      dy = y - Math.sin(start + step * n - halfStep) * this.innerRadius;
      this.quadraticCurveTo(cx, cy, dx, dy);
      cx =
        x +
        Math.cos(start + step * n - qtrStep) *
          (this.innerRadius / Math.cos(qtrStep));
      cy =
        y -
        Math.sin(start + step * n - qtrStep) *
          (this.innerRadius / Math.cos(qtrStep));
      dx = x + Math.cos(start + step * n) * this.outerRadius;
      dy = y - Math.sin(start + step * n) * this.outerRadius;
      this.quadraticCurveTo(cx, cy, dx, dy);
    }
  }

  get area() {
    return Math.floor(((Math.PI * this.width * this.height) / 4) * 3);
  }
}
