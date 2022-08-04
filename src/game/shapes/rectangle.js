import BaseShape from "./baseShape";

export default class Rectangle extends BaseShape {
  constructor(w = 50, h = 50) {
    super();

    this.w = w;
    this.h = h;

    this.createShape();
  }

  createShape() {
    const { x, y } = this.position;

    this.beginFill(`0x${this.color}`);
    this.drawShape(new PIXI.Rectangle(x, y, this.w, this.h));
  }

  get area() {
    return this.w * this.h;
  }
}
