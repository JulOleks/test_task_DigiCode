import BaseShape from "./baseShape";

export default class Polygon extends BaseShape {
  constructor(sides = 4, angle = 0, radius = 50) {
    super();

    this.sides = sides;
    this.radius = radius;
    this.angle = angle;

    this.createShape();
  }

  createShape() {
    const { x, y } = this.position;

    const step = (Math.PI * 2) / this.sides;
    const start = (this.angle / 180) * Math.PI;
    let n, dx, dy;

    this.beginFill(`0x${this.color}`);
    this.moveTo(
      x + Math.cos(start) * this.radius,
      y - Math.sin(start) * this.radius
    );

    for (n = 1; n <= this.sides; ++n) {
      dx = x + Math.cos(start + step * n) * this.radius;
      dy = y - Math.sin(start + step * n) * this.radius;
      this.lineTo(dx, dy);
    }
  }

  get area() {
    return Math.floor(((Math.PI * this.width * this.height) / 4) * 3);
  }
}
