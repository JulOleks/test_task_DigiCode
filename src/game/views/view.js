import config from "../config";
import GUI from "../gui";

export default class View {
  constructor(app) {
    this.app = app;
    this.background = null;

    this.createBackground();
    this.eventListeners();

    this.setText();
  }

  /**
   * creates canvas background
   *
   */
  createBackground() {
    this.background = new GUI(this.app);
    this.app.stage.addChild(this.background);
  }

  /**
   * set html text
   *
   */
  setText() {
    const {surface, nShapes, gravity, perSecShapes} = config.text;
    
    document.querySelector(".surface__area").innerText = surface;
    document.querySelector(".current__shapes").innerText = nShapes;
    document.querySelector(".footer__number__shapes__text").innerText =
      perSecShapes;
    document.querySelector(".footer__gravity__text").innerText = gravity;
  }

  /**
   * handle event listeners for buttons
   *
   */
  eventListeners() {
    document
      .getElementById("shapes__decrease")
      .addEventListener("click", () =>
        this.app.emit("clickShapesSecButton", -1)
      );
    document
      .getElementById("shapes__increase")
      .addEventListener("click", () =>
        this.app.emit("clickShapesSecButton", +1)
      );
    document
      .getElementById("gravity__decrease")
      .addEventListener("click", () =>
        this.app.emit("clickGravityButton", -0.1)
      );
    document
      .getElementById("gravity__increase")
      .addEventListener("click", () =>
        this.app.emit("clickGravityButton", +0.1)
      );
  }

  updateGravity(value) {
    document.getElementById("gravity__val").innerText = value;
  }

  updateShapesNumberPerSec(value) {
    document.getElementById("shapes__per__sec__val").innerText = value;
  }

  /**
   * update data display of shapes area and active shapes numper per second
   *
   */
  updateShapesData(data) {
    const { surfaceArea, numberShapes } = data;
    document.getElementById("surface__area").innerText = surfaceArea;
    document.getElementById("number__shapes__val").innerText = numberShapes;
  }

  update() {}
}
