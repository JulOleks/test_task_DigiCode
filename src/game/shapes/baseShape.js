import Counter from "../counter";

export default class BaseShape extends PIXI.Graphics {
  constructor() {
    super();
    this.counter = new Counter();

    this.id = this.counter.generateId();
    this.setRndColor();
  }

  generateRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  setRndColor() {
    this.color = this.generateRandomColor();
  }

  getClassName() {
    return this.constructor.name;
  }
}
