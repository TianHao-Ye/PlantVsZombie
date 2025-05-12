import Entity from "../Entity";
import { ZombieState } from "../../Managers/ZombieManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalZombie extends Entity {
  @property
  public walkingSpeed = 0.02;
  private _currentState: ZombieState = undefined;
  private _currentAnimation: cc.Tween = undefined;
  private _walkAnimation: cc.Tween = undefined;
  private _attackAnimation: cc.Tween = undefined;

  private _targetX = (-1 * cc.winSize.width) / 2 + 100;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._setMotions();
    this._playWalkingMotion();
  }

  private _setMotions(): void {
    this._currentState = ZombieState.Idle;
    this._walkAnimation = cc
      .tween(this.node)
      .to(1 / this.walkingSpeed, { x: this._targetX })
      .call(() => {
        this.die();
      });
    this._attackAnimation = cc
      .tween(this.node)
      .repeatForever(cc.tween().to(0.5, { angle: -90 }).to(0.5, { angle: 90 }));
  }

  private _playWalkingMotion(): void {
    this.stopAnimation();
    this._walkAnimation.start();
    this._currentAnimation = this._walkAnimation;
    this._currentState = ZombieState.Walking;
  }

  public playAttackMotion(): void {
    if (this._currentState === ZombieState.Attacking) {
      return;
    }

    this.stopAnimation();

    const attackAnimation = cc
      .tween(this.node)
      // .to(1, { angle: -45 })
      // .to(1, { angle: 45 });
      .repeatForever(cc.tween().by(0.5, { angle: -360 }));

    attackAnimation.start();
    this._currentAnimation = this._attackAnimation;
    this._currentState = ZombieState.Attacking;
  }

  public stopAnimation(): void {
    if (!this._currentAnimation) {
      return;
    }
    this._currentAnimation.stop();
    this._currentAnimation = undefined;
    this._currentState = ZombieState.Idle;
  }
}
