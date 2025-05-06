import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScheduler extends cc.Component {
  private _sunSpawnCallback: () => void = undefined;
  private _gameManager: GameManager = undefined;

  public init(gameManager: GameManager): void {
    this._gameManager = gameManager;
  }

  public scheduleSpawningSun(cb: () => void, interval: number): void {
    this._sunSpawnCallback = cb;
    if(this._sunSpawnCallback){
      this.schedule(this._sunSpawnCallback, interval);
    }
  }

  public stopSunSpawning(): void {
    this.unschedule(this.scheduleSpawningSun);
  }
}
