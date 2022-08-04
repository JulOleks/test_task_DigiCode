import config from "../config";

export default class Model {
  constructor(app) {
    this.app = app;
    this.allShapes = [];
    this._gravity = config.startGravity;
    this._nShapesPerSecond = config.startShapesPerSec;
  }

  /**
   * Added created shapes into array
   *
   */
  addShape(shape) {
    this.allShapes.push(shape);
  }

  /**
   * Udates all active shapes gravity
   *
   */
  updateShapesGravity() {
    this.allShapes.forEach((shape) => shape.setGravity(this.gravity));
  }

  update() {
    this.allShapes.forEach((shape) => {
      shape.update();
    });
  }

  /**
   * @return {number} numberOfCurrentShapes - amount of active shapes on screen
   */
  get numberOfCurrentShapes() {
    return this.allShapes.length;
  }

  /**
   * @return {number} surfaceArea - general area of all active shapes
   */
  get surfaceArea() {
    return Math.floor(this.allShapes.reduce((acc, cur) => acc + cur.area, 0));
  }

  /**
   * @return {number} nShapesPerSecond - generated shapes per second
   */
  get nShapesPerSecond() {
    return this._nShapesPerSecond;
  }

  set nShapesPerSecond(val) {
    this._nShapesPerSecond = val;
  }

  /**
   * @return {number} gravity - shape gravity
   */
  get gravity() {
    return this._gravity;
  }

  /**
   * Set new gravity value and update it in the shapes data 
   */
  set gravity(grav) {
    this._gravity = grav;

    this.updateShapesGravity();
  }
}
