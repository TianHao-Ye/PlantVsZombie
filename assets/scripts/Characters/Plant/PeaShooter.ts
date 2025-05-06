import Plant from "./Plant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeaShooter extends Plant {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}

  protected attack(): void {
    cc.log("Peashooter shoots a bullet!");
  }
}
