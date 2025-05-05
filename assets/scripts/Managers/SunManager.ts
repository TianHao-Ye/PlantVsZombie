import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SunManager {
  private _unitSunValue: number = undefined;
  private _sunLayer: cc.Node = undefined;
  private _sunValue: number = undefined;
  private _gameManager: GameManager = undefined;
  private _sunPrefab: cc.Prefab = undefined;

  public init(
    unitSunValue: number,
    sunLayer: cc.Node,
    sunPrefab: cc.Prefab,
    gameManager: GameManager
  ): void {
    this._unitSunValue = unitSunValue;
    this._sunLayer = sunLayer;
    this._sunPrefab = sunPrefab;
    this._gameManager = gameManager;
    this._sunValue = 0;

    this._startSpawningSun();
  }

  public onGlobalTouchStart(touchPos: cc.Vec2): boolean {
    for (const sun of this._sunLayer.children) {
      if (sun.getBoundingBoxToWorld().contains(touchPos)) {
        this._sunCollectMotion(sun);
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

  private _createFallingSun(): void {
    let newSun: cc.Node = cc.instantiate(this._sunPrefab);

    let targetPos = this._getRandomSunPosition();
    let startY = cc.winSize.height / 2 + 100;
    newSun.setPosition(cc.v2(targetPos.x, startY));
    this._sunLayer.addChild(newSun);

    cc.tween(newSun).to(3, { y: targetPos.y }, { easing: "linear" }).start();
  }

  private _sunFadingMotion(): void {
    
  }

  private _sunCollectMotion(sun: cc.Node): void {
    const worldTargetPos = this._gameManager
      .getUiManager()
      .sunIcon.convertToWorldSpaceAR(cc.v2(0, 0));
    const localTargetPos = this._sunLayer.convertToNodeSpaceAR(worldTargetPos);
    cc.tween(sun)
      .to(
        0.5,
        { position: cc.v3(localTargetPos.x, localTargetPos.y, 0) },
        { easing: "quadOut" }
      )
      .call(() => {
        this._onSunCollected(sun);
      })
      .start();
  }

  private _onSunCollected(sun: cc.Node): void {
    sun.destroy();
    this.addSunValue(this._unitSunValue);
    this._gameManager.getUiManager().updateSunLabel(this._sunValue);
  }

  private _startSpawningSun(interval: number = 5): void {
    this._gameManager
      .getGameScheduler()
      .scheduleSpawningSun(this._createFallingSun.bind(this), interval);
  }
}
