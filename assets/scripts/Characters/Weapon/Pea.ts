import NormalZombie from "../Zombie/NormalZombie";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pea extends cc.Component {
  private _flySpeed: number = 120;
  private _damage = 20;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._playFlyingHorizontalMotion();
  }

  protected onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    const otherNode = other.node;
    if (otherNode.group === "zombie") {
      const zombie = otherNode.getComponent(NormalZombie);
      zombie?.takeDamage(this._damage);

      this.node.destroy();
    }
  }

  private _playFlyingHorizontalMotion(): void {
    if (!this.node.parent) {
      return;
    }
    const startX = this.node.x;
    const targetX = cc.winSize.width / 2 - 50;
    const distance = targetX - startX;
    const flyTime = Math.abs(distance / this._flySpeed);

    cc.tween(this.node)
      .to(flyTime, { x: targetX }, { easing: "linear" })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }
}
