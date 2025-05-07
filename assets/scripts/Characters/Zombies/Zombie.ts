import Entity from "../Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Zombie extends Entity {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}

  public playWalkingMotion(): void {
    const targetX = (-1 * cc.winSize.width) / 2 + 100;
    cc.tween(this.node).to(20, { x: targetX }).start();
  }
}
