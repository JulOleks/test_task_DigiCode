import config from "../config";
import Model from "../models/model";
import RandomShape from "../shapes/rndShape";
import RandomShapeGenerator from "../shapes/rndShapeGenerator";
import View from "../views/view";

export default class Controller {
  constructor(app) {
    this.app = app;
    this.model = new Model(app);
    this.view = new View(app);
    this.randomShapeGenerator = new RandomShapeGenerator();

    this.seconds = 0;
    this.lastSec = 0;

    this.init();

    this.app.on("clickShapesSecButton", (arg) =>
      this.onShapeUpdateNumPerSec(arg)
    );
    this.app.on("clickGravityButton", (arg) => this.onGravityUpdate(arg));
    this.app.on("shapeClick", (arg) => this.onShapeClick(arg));
    this.app.on("canvasClick", (arg) => this.onCanvasClick(arg));
  }

  init() {
    this.generateShapes();

    this.view.updateShapesNumberPerSec(this.model.nShapesPerSecond);
    this.view.updateGravity(this.model.gravity);
  }

  update(delta) {
    this.seconds += (1 / 60) * delta;
    this.model.update();

    if (this.seconds - this.lastSec > 1) {
      // update every seconds
      this.generateShapes();

      this.lastSec = Math.floor(this.seconds);
      this.onUpdateView();
    }

    this.removeInvisibleShapeOutCanvas();
  }

  /**
   * Handles canvas click
   *
   * @param  {object} data -  get position.
   */
  onCanvasClick({ data }) {
    const { global: position } = data;

    this.generateShapes(1, position);
  }

  /**
   * Handles shape click
   *
   * @param  {object} shape - clicked shape.
   */
  onShapeClick(shape) {
    this.removeShape(shape);
    this.recolorSameShapes(shape);
  }

  /**
   * Recolor same shapes
   *
   * @param  {object} incShape - clicked shape.
   */
  recolorSameShapes(incShape) {
    this.model.allShapes.forEach((rndShape) => {
      if (rndShape.isActive) {
        if (rndShape.getShapeType() === incShape.getShapeType()) {
          rndShape.changeColor();
        }
      }
    });
  }

  /**
   * Update amount of generating shapes per sec
   *
   * @param  {number} val - number of shapes generates per second.
   */
  onShapeUpdateNumPerSec(val) {
    const { min, max } = config.shapesPerSec;
    this.model.nShapesPerSecond += val;

    if (this.model.nShapesPerSecond <= min) {
      this.model.nShapesPerSecond = min;
    } else if (this.model.nShapesPerSecond >= max) {
      this.model.nShapesPerSecond = max;
    }

    this.view.updateShapesNumberPerSec(this.model.nShapesPerSecond);
  }

  /**
   * Update shape's gravity value
   *
   * @param  {number} val - gravity value
   */
  onGravityUpdate(val) {
    const { min, max } = config.gravity;
    this.model.gravity += val;

    if (this.model.gravity < min) {
      this.model.gravity = min;
    } else if (this.model.gravity > max) {
      this.model.gravity = max;
    }

    this.view.updateGravity(Math.floor(this.model.gravity * 100) / 100);
  }

  /**
   * Generate shapes according income amount
   *
   * @param  {number} amount - number of shapes generates per second.
   * @param  {number} position - x, y position of shape appearance.
   */
  generateShapes(amount = this.model.nShapesPerSecond, position) {
    for (let i = 0; i < amount; i++) {
      const newShape = this.createShape(position);
      this.app.stage.addChild(newShape);
      this.model.addShape(newShape);
    }
  }

  /**
   * Create new random shape
   *
   * @param  {number} x - x position of shape appearance.
   * @param  {number} y - y position of shape appearance.
   * @param  {number} gravity - gravity of shape.
   *
   * @return {RandomShape} new object random shape.
   */
  createShape(data = {}) {
    const newData = {
      position: { x: data.x, y: data.y },
      gravity: this.model.gravity,
    };

    return new RandomShape(
      this.app,
      newData,
      this.randomShapeGenerator.createRndShape()
    );
  }

  removeShape(incShape) {
    this.model.allShapes = this.model.allShapes.filter(
      (shape) => shape.isActive
    );
    this.app.stage.removeChild(incShape);
  }

  /**
   * Remove shapes that position are below canvas
   *
   */
  removeInvisibleShapeOutCanvas() {
    const canvas = this.app.view;
    let shapeToRemove = null;

    new Promise((resolve) => {
      shapeToRemove = this.model.allShapes.find((shapeContainer) => {
        if (shapeContainer.y > canvas.height) return shapeContainer;
      });

      if (shapeToRemove) {
        shapeToRemove.isActive = false;
        resolve();
      }
    }).then(() => {
      this.removeShape(shapeToRemove);
    });
  }

  /**
   * Update view with parametrs from the model
   *
   */
  onUpdateView() {
    const data = {
      surfaceArea: this.model.surfaceArea,
      numberShapes: this.model.numberOfCurrentShapes,
    };

    this.view.updateShapesData(data);
  }
}
