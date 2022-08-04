export default class RandomShape extends PIXI.Container {
  constructor(app, data = {}, randomShape = {}) {
    super();
    this.app = app;

    this.position =
      data.position.x === undefined
        ? this.generateRndStartPosition()
        : data.position;

    this.gravity = data.gravity;
    this.interactive = true;
    this.isRemoved = false;
    this.isActive = true;

    this.vy = 0;
    this.accelerationY = 0;
    this.frictionY = 0.9;
    this.speed = 0.0009;

    this.shape = randomShape;
    this.area = this.shape.area;

    this.addChild(this.shape);

    this.on("pointerdown", (e) => this.app.emit("shapeClick", e.target));
  }

  generateRndStartPosition() {
    return {
      x: utils.random(0, this.app.screen.width),
      y: utils.random(0, -this.app.screen.height / 2),
    };
  }

  animate() {
    this.accelerationY = this.speed;
    this.vy += this.accelerationY;
    this.vy *= this.frictionY;

    //gravity
    this.vy += this.gravity;
    this.y += this.vy;
  }

  update() {
    this.animate();
  }

  getShapeType() {
    return this.shape.getClassName(); //get shape type: circle, rectangle, polygon...
  }

  /**
   * update shape random color
   *
   */
  changeColor() {
    this.shape.setRndColor();
    this.shape.createShape();
  }

  setGravity(val) {
    this.gravity = val;
  }
}
