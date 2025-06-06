import { GameSettings } from "../Settings/GameSetting";
import Entity from "./Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Sun extends Entity {
  @property
  public lifeTime: number = GameSettings.SUN_LIFE_TIME;

  private _onCollectedCB: () => void;

  // LIFE-CYCLE CALLBACKS:

  // update (dt) {}

  public playFallMotion(targetPos: cc.Vec2): void {
    cc.tween(this.node)
      .to(3, { y: targetPos.y }, { easing: "linear" })
      .call(() => {
        this._playFadeMotion();
      })
      .start();
  }

  public playCollectedMotion(targetPos: cc.Vec2, cb: () => void): void {
    this._onCollectedCB = cb;
    if (this._onCollectedCB) {
      cc.tween(this.node)
        .to(
          0.5,
          { position: cc.v3(targetPos.x, targetPos.y, 0) },
          { easing: "quadOut" }
        )
        .call(() => {
          this.die();
          this._onCollectedCB();
        })
        .start();
    }
  }

  private _playFadeMotion(): void {
    cc.tween(this.node)
      .to(this.lifeTime, { opacity: 0.5 * this.node.opacity })
      .call(() => {
        this.die();
      })
      .start();
  }

  public playRandomJumpMotion(startPos: cc.Vec2): void {
    const height = 150;
    const jumpDirection = Math.random() < 0.5 ? -1 : 1;
    const JumpDistanceX = 150;
    const endPos = cc.v3(
      startPos.x + jumpDirection * JumpDistanceX,
      startPos.y,
      0
    );

    cc.tween(this.node)
      .to(
        0.8,
        { position: endPos },
        {
          progress: (start, end, current, ratio) => {
            const x = start.x + (end.x - start.x) * ratio;
            const yOffset = 4 * height * ratio * (1 - ratio);
            const y = start.y + (end.y - start.y) * ratio + yOffset;
            return cc.v2(x, y);
          },
        }
      )
      .call(() => {
        this._playFadeMotion();
      })
      .start();
  }

  protected die() {
    cc.Tween.stopAllByTarget(this.node);
    this.node.destroy();
  }
}
