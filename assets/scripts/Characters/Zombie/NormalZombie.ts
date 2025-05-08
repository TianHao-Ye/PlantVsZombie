import Entity from "../Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalZombie extends Entity {
  @property
  public walkingSpeed = 0.02;
  private _walkTween: cc.Tween = undefined;
  private _attackTween: cc.Tween = undefined;

  private _targetX = (-1 * cc.winSize.width) / 2 + 100;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._setMotions();
    this._playWalkingMotion();
  }

  private _setMotions(): void {
    this._walkTween = cc
      .tween(this.node)
      .to(1 / this.walkingSpeed, { x: this._targetX })
      .call(() => {
        this.die();
      });
    this._attackTween = cc.tween(this.node).to(1, { angle: -90 });
  }

  private _playWalkingMotion(): void {
    this._walkTween.start();
  }

  public playAttackMotion(): void {
    this.stopWalking();
    this._attackTween.start();
  }

  public stopWalking(): void {
    if (this._walkTween) {
      this._walkTween.stop();
      this._walkTween = undefined;
    }
  }
}
