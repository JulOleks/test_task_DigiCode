import BaseApp from "./BaseApp";
import Controller from "./game/controllers/controller";

export default class App extends BaseApp {
  constructor() {
    super();

    this.controller = new Controller(this);

    this.update();
  }

  update() {
    this.ticker.add((e) => this.controller.update(e));
  }
}
