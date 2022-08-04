import BaseShape from "./baseShape";

export default class Circle extends BaseShape {
  constructor(radius = 10) {
    super();

    this.radius = radius;

    this.createShape();
  }

  createShape() {
    this.clear();
    this.beginFill(`0x${this.color}`);
    this.drawShape(new PIXI.Circle(0, 0, this.radius));

    return this;
  }

  get area() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}
