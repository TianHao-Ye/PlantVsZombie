import { IManager } from "../../Managers/IManager";
import SunManager from "../../Managers/SunManager";
import Plant from "./Plant";

const { ccclass, property } = cc._decorator;


@ccclass
export default class SunFlower extends Plant {
  private _sunManager: SunManager;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {}

  protected start(): void {}

  // update (dt) {}

  protected attack(): void {
    console.log("love && peace");
  }

  private _spawnSun(): void {
    this.schedule(() => {
      this._sunManager.createJumpingSun(this.node.getPosition());
    }, this.attackInterval);
  }

  public setManager(sunManager: SunManager): void {
    this._sunManager = sunManager;
    this._sunManager && this._spawnSun();
  }
}
