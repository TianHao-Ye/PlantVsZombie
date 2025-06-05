import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScheduler extends cc.Component {
  private _zombieSpawnCallback: () => void = undefined;
  private _sunSpawnCallback: () => void = undefined;
  private _gameManager: GameManager = undefined;

  public init(gameManager: GameManager): void {
    this._gameManager = gameManager;
  }

  public scheduleSpawningSun(cb: () => void, interval: number): void {
    this._sunSpawnCallback = cb;

    this._sunSpawnCallback && this.schedule(this._sunSpawnCallback, interval);
  }

  public scheduleSpawningZombie(cb: () => void, interval: number): void {
    this._zombieSpawnCallback = cb;

    this._zombieSpawnCallback &&
      this.schedule(this._zombieSpawnCallback, interval);
  }

  public stopSpawningSun(): void {
    this.unschedule(this._sunSpawnCallback);
  }

  public stopSpawningZombie(): void {
    this.unschedule(this._zombieSpawnCallback);
  }

  public stopAll(): void {
    this.stopSpawningSun();
    this.stopSpawningZombie();
  }
}
