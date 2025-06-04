import Entity from "../Entity";
import { ZombieState } from "../../Managers/ZombieManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalZombie extends Entity {
  @property
  public walkingSpeed = 1;

  private _currentState: ZombieState = undefined;
  private _currentAnimation: cc.Tween = undefined;

  private _targetX = (-1 * cc.winSize.width) / 2 + 100;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._initMotion();
    this._playWalkingMotion();
  }
  public checkNaturalDeath(): boolean {
    if (this.node.x == this._targetX) {
      this.die();
      return false;
    }
    return true;
  }

  private _initMotion(): void {
    this._currentState = ZombieState.Idle;
  }

  private _playWalkingMotion(): void {
    if (this._currentState === ZombieState.Walking) {
      return;
    }
    this.stopAnimation();
    const walkAnimation = cc
      .tween(this.node)
      .by(1 / this.walkingSpeed, { x: -40 })
      .repeatForever()
      .start();
    this._currentAnimation = walkAnimation;
    this._currentState = ZombieState.Walking;
  }

  public playAttackMotion(): void {
    if (this._currentState === ZombieState.Attacking) {
      return;
    }
    this.stopAnimation();

    const attackAnimation = cc
      .tween(this.node)
      .repeatForever(cc.tween().by(0.5, { angle: -360 }))
      .start();
    this._currentAnimation = attackAnimation;
    this._currentState = ZombieState.Attacking;
  }

  public stopAnimation(): void {
    if (!this._currentAnimation) {
      return;
    }
    this._currentAnimation.stop();
    this._currentAnimation = undefined;
    this.node.angle = 0;
    this._currentState = ZombieState.Idle;
  }
}
