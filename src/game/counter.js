/**
 * Generate id
 *
 */
export default class Counter extends PIXI.Container {
  constructor() {
    super();

    this.id = 0;
  }

  increase() {
    this.id++;
  }

  generateId() {
    const tempId = this.id;
    this.increase();

    return tempId;
  }
}
