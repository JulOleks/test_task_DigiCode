import config from "../config";
import BaseShape from "./baseShape";
import Circle from "./circle";
import Ellipse from "./ellipse";
import FlexibleShape from "./flexibleShape";
import Polygon from "./polygon";
import Rectangle from "./rectangle";

export default class RandomShapeGenerator extends PIXI.Container {
  constructor() {
    super();
  }

  /**
   * Generate new random shape
   *
   * @return {BaseShape} new object random shape.
   */
  createRndShape() {
    const { shapeTypesSettings, shapes } = config;
    const shapeType = shapes[utils.random(0, shapes.length - 1)]; // randomly get type of shapes

    switch (shapeType) {
      case "circle":
        const { radius: r1 } = shapeTypesSettings[shapeType];
        const rndR1 = utils.random(r1.min, r1.max);

        return new Circle(rndR1);

      case "ellipse":
        const { w: width1, h: height1 } = shapeTypesSettings[shapeType];
        const w1 = utils.random(width1.min, width1.max);
        const h1 = utils.random(height1.min, height1.max);

        return new Ellipse(w1, h1);

      case "polygon":
        const { sides, radius: r2, angle } = shapeTypesSettings[shapeType];
        const rndR2 = utils.random(r2.min, r2.max);
        const rndSides1 = utils.random(sides.min, sides.max);
        const rndAngle = utils.random(angle.min, angle.max);

        return new Polygon(rndSides1, rndAngle, rndR2);

      case "rectangle":
        const { w: width2, h: height2 } = shapeTypesSettings[shapeType];
        const w2 = utils.random(width2.min, width2.max);
        const h2 = utils.random(height2.min, height2.max);

        return new Rectangle(w2, h2);

      case "flexibleShape":
        const {
          sides: sides2,
          angle: angle2,
          innerRadius,
          outerRadius,
        } = shapeTypesSettings[shapeType];
        const rndSides2 = utils.random(sides2.min, sides2.max);
        const rndAngle2 = utils.random(angle2.min, angle2.max);
        const inRadius = utils.random(innerRadius.min, innerRadius.max);
        const outRadius = utils.random(outerRadius.min, outerRadius.max);

        return new FlexibleShape(rndSides2, rndAngle2, inRadius, outRadius);
    }
  }
}
