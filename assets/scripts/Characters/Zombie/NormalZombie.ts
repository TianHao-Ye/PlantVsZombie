import Entity from "../Entity";
import { ZombieState } from "../../Managers/ZombieManager";
import { GameSettings } from "../../Settings/GameSetting";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalZombie extends Entity {
  @property
  public walkSpeed = GameSettings.ZOMBIE_WALK_SPEED;

  @property
  public damage: number = 40;

  private _currentState: ZombieState = undefined;
  private _currentAnimation: cc.Tween = undefined;
  private _lastAttackInterval = 0;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {
    this._initMotion();
    this.playWalkingMotion();
  }
  public checkReachHouse(): boolean {
    const reachedHouse = false;
    if (this.node.x == GameSettings.getZombieEndX()) {
      return !reachedHouse;
    }
    return reachedHouse;
  }

  public addLastAttackInterval(dt: number): void {
    this._lastAttackInterval += dt;
    if(this._lastAttackInterval >= this.getAttackInterval()){
      this._lastAttackInterval = 0;
    }

  }

  public getLastAttackInterval(): number {
    return this._lastAttackInterval;
  }

  private _initMotion(): void {
    this._currentState = ZombieState.Idle;
  }

  public playWalkingMotion(): void {
    if (this._currentState === ZombieState.Walking) {
      return;
    }
    this.stopAnimation();
    const walkAnimation = cc
      .tween(this.node)
      .by(1 / this.walkSpeed, { x: -40 })
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
