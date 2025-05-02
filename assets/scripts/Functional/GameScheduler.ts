import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScheduler extends cc.Component {
  private _sunSpawnCallback: () => void = undefined;
  private _gameManager: GameManager = undefined;

  public init(gameManager: GameManager): void {
    this._gameManager = gameManager;
  }

  public startSunSpawning(cb: () => void, interval: number): void {
    this._sunSpawnCallback = cb;
    this.schedule(this._spawnSun.bind(this), interval);
  }

  private _spawnSun(): void {
    if (this._sunSpawnCallback) {
      this._sunSpawnCallback();
    }
  }

  public stopSunSpawning(): void {
    this.unschedule(this._spawnSun);
  }
}
