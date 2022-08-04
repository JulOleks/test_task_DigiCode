import BaseShape from "./baseShape";

export default class Ellipse extends BaseShape {
  constructor(w = 50, h = 90) {
    super();

    this.w = w;
    this.h = h;

    this.createShape();
  }

  createShape() {
    const { x, y } = this.position;

    this.beginFill(`0x${this.color}`);
    this.drawShape(new PIXI.Ellipse(x, y, this.w, this.h));
  }

  get area() {
    return Math.PI * (this.width / 2) * (this.height / 2);
  }
}
