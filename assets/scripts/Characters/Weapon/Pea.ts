import { ZoombieScriptMap } from "../../Managers/ZombieManager";
import { GameSettings } from "../../Settings/GameSetting";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pea extends cc.Component {
  private _flySpeed: number = 150;
  private _damage = 20;
  private _targetX = GameSettings.getBulletEndX();

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._playFlyingHorizontalMotion();
  }

  protected onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    const zombieNode = other.node;
    const zoombieScriptName = ZoombieScriptMap[zombieNode.name];
    const zoombieScript = zombieNode.getComponent(zoombieScriptName);
    zoombieScript?.takeDamage(this._damage);
    this.die();
  }

  private _playFlyingHorizontalMotion(): void {
    if (!this.node.parent) {
      return;
    }
    const startX = this.node.x;
    const targetX = this._targetX;
    const distance = targetX - startX;
    const flyTime = Math.abs(distance / this._flySpeed);

    cc.tween(this.node)
      .to(flyTime, { x: targetX }, { easing: "linear" })
      .call(() => {
        this.die();
      })
      .start();
  }

  protected die() {
    cc.Tween.stopAllByTarget(this.node);
    this.node.destroy();
  }
}
