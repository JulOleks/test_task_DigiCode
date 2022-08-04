import { Graphics } from "@pixi/graphics";

export default class GUI extends Graphics {
  constructor(app) {
    super();
    this.app = app;

    this.interactive = true;
    this.createBackground();

    this.on("pointerdown", (e) => this.app.emit("canvasClick", e));
  }

  /**
   * draw canvas rectangle
   *
   */
  createBackground() {
    this.lineStyle(1, 0x000000);
    this.beginFill(0xffffff, 1);
    this.drawShape(
      new PIXI.Rectangle(0, 0, this.app.screen.width, this.app.screen.height)
    );
  }
}
