import Entity from "../Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalZombie extends Entity {
  @property
  public walkingSpeed = 0.02;

  // LIFE-CYCLE CALLBACKS:

  // onCollisionEnter(other: cc.Collider, self: cc.Collider) {
  //   if (other.node.group === "weapon") {
  //     const bullet = other.node.getComponent("Pea");
  //     if (bullet) {
  //       this.takeDamage(20);
  //       bullet.node.destroy();
  //     }
  //   }
  // }

  public playWalkingMotion(): void {
    const targetX = (-1 * cc.winSize.width) / 2 + 100;
    cc.tween(this.node)
      .to(1 / this.walkingSpeed, { x: targetX })
      .call(() => {
        this.die();
      })
      .start();
  }
}
