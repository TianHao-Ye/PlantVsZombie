import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SunManager {
  private _sunLayer: cc.Node = undefined;
  private _sunValue: number = undefined;
  private _gameManager: GameManager = undefined;
  private _sunPrefab: cc.Prefab = undefined;

  public init(
    gameManager: GameManager,
    sunManager: cc.Node,
    sunPrefab: cc.Prefab
  ): void {
    this._sunLayer = sunManager;
    this._gameManager = gameManager;
    this._sunValue = 0;
    this._sunPrefab = sunPrefab;

    this._startSpawningSun();
  }

  public addSunValue(amount: number): void {
    this._sunValue += amount;
  }

  public useSunValue(amount: number): boolean {
    if (this._sunValue >= amount) {
      this._sunValue -= amount;
      return true;
    }
    return false;
  }

  public getSunValue(): number {
    return this._sunValue;
  }

  private _getRandomSunPosition(): cc.Vec2 {
    return this._gameManager.getGridManager().getRandomWorldPos();
  }

  private _spawnSun(): void {
    let newSun: cc.Node = cc.instantiate(this._sunPrefab);
    let targetPos = this._getRandomSunPosition();
    let startY = cc.winSize.height / 2 + 100;
    this._sunLayer.addChild(newSun);

    newSun.setPosition(cc.v2(targetPos.x, startY));
    cc.tween(newSun).to(3, { y: targetPos.y }, { easing: "linear" }).start();
  }

  private _startSpawningSun(interval: number = 5): void {
    this._gameManager
      .getGameScheduler()
      .startSunSpawning(this._spawnSun.bind(this), interval);
  }
}
