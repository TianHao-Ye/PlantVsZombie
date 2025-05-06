import { IManager } from "../../Managers/IManager";
import Entity from ".././Entity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plant extends Entity {
  @property
  public attackInterval: number = 1.5;

  // LIFE-CYCLE CALLBACKS:

  protected start(): void {}

  // update (dt) {}

  protected attack(): void {}
}
