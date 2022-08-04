"use strict";
import * as PIXI from "pixi.js";
import "./game/utils";

window.PIXI = PIXI;

export default class BaseApp extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.7,
      antialias: true,
      resolution: 1,
      backgroundAlpha: 1,
    });

    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.appendRenderView();
    this.update();

    return this;
  }

  appendRenderView() {
    document.querySelector(".app").appendChild(this.view);
  }

  emit() {
    this.eventEmitter.emit.apply(this.eventEmitter, arguments);
  }

  on(event, callback, context = null) {
    this.eventEmitter.on(event, callback, context);
  }

  once(event, callback, context = null) {
    this.eventEmitter.once(event, callback, context);
  }
}
