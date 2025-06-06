import Sun from "../Characters/Sun";
import { GameSettings } from "../Settings/GameSetting";
import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SunManager implements IManager {
  private _unitSunValue = GameSettings.UNIT_SUN_VALUE;
  private _sunLayer: cc.Node = undefined;
  private _sunValue: number = undefined;
  private _gameManager: GameManager = undefined;
  private _sunPrefab: cc.Prefab = undefined;
  private _sunIconPos: cc.Vec2 = undefined;

  public init(
    sunLayer: cc.Node,
    sunPrefab: cc.Prefab,
    gameManager: GameManager
  ): void {
    this._sunLayer = sunLayer;
    this._sunPrefab = sunPrefab;
    this._gameManager = gameManager;
    this._sunValue = 0;

    this._setSunIconPos();
  }

  public playGame(): void {
    this._startSpawningSun();
  }

  public endGame(): void {
    this._sunLayer.children.forEach((sunNode) => {
      const sunScript = sunNode.getComponent("Sun");
      sunScript && sunScript.die();
    });

    this._sunValue = 0;
  }

  public onGlobalTouchStart(touchPos: cc.Vec2): boolean {
    for (const sun of this._sunLayer.children) {
      if (sun.getBoundingBoxToWorld().contains(touchPos)) {
        this._onCollectSun(sun);
        return true;
      }
    }
    return false;
  }

  public addSunValue(amount: number = this._unitSunValue): void {
    this._sunValue += amount;
  }

  public useSunValue(amount: number): boolean {
    if (this._sunValue >= amount) {
      this._sunValue -= amount;
      this._gameManager.getUiManager().updateSunLabel(this._sunValue);
      return true;
    }
    return false;
  }

  public getTotalSunValue(): number {
    return this._sunValue;
  }

  private _getRandomSunPosition(): cc.Vec2 {
    return this._gameManager.getGridManager().getRandomWorldPos();
  }

  private _createRandomFallingSun(): void {
    let newSun: cc.Node = this._createSingleSun();
    let targetPos = this._getRandomSunPosition();
    let startY = cc.winSize.height / 2 + 100;

    this._sunLayer.addChild(newSun);
    newSun.setPosition(cc.v2(targetPos.x, startY));
    newSun.getComponent(Sun).playFallMotion(targetPos);
  }

  public createJumpingSun(startPos: cc.Vec2): void {
    let newSun: cc.Node = this._createSingleSun();

    this._sunLayer.addChild(newSun);
    newSun.setPosition(startPos);
    newSun.getComponent(Sun).playRandomJumpMotion(startPos);
  }

  private _createSingleSun(): cc.Node {
    return cc.instantiate(this._sunPrefab);
  }

  private _setSunIconPos(): void {
    const worldTargetPos = this._gameManager
      .getUiManager()
      .sunIcon.convertToWorldSpaceAR(cc.v2(0, 0));
    this._sunIconPos = this._sunLayer.convertToNodeSpaceAR(worldTargetPos);
  }

  private _onCollectSun(sun: cc.Node): void {
    sun
      .getComponent(Sun)
      .playCollectedMotion(
        this._sunIconPos,
        this._onCollectSunEvents.bind(this)
      );
  }

  private _onCollectSunEvents(): void {
    this.addSunValue(this._unitSunValue);
    this._gameManager.getUiManager().updateSunLabel(this._sunValue);
  }

  private _startSpawningSun(interval: number = 6): void {
    this._gameManager
      .getGameScheduler()
      .scheduleSpawningSun(this._createRandomFallingSun.bind(this), interval);
  }
}
