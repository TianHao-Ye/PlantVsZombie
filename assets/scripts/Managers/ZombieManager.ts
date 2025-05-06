import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ZoobieManager implements IManager {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}

  public init(...args: any[]): void {}
}
