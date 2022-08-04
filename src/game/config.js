const config = {
  shapeTypesSettings: {
    circle: {
      radius: { min: 10, max: 90 },
    },
    ellipse: {
      w: { min: 5, max: 100 },
      h: { min: 5, max: 100 },
    },
    rectangle: {
      w: { min: 10, max: 100 },
      h: { min: 10, max: 100 },
    },
    polygon: {
      sides: { min: 3, max: 8 },
      angle: { min: 0, max: 10 },
      radius: { min: 5, max: 100 },
    },
    flexibleShape: {
      sides: { min: 3, max: 15 },
      angle: { min: 0, max: 15 },
      innerRadius: { min: 5, max: 100 },
      outerRadius: { min: 5, max: 100 },
    },
  },
  startGravity: 0.1,
  startShapesPerSec: 2,
  gravity: { min: 0.1, max: 0.9 },
  shapesPerSec: { min: 1, max: 10 },
  shapes: ["circle", "rectangle", "polygon", "ellipse", "flexibleShape"],
  text: {
    surface: "Surface area:",
    nShapes: "Number current shapes:",
    perSecShapes: "Shapes per sec",
    gravity: "Gravity",
  },
};

export default config;
