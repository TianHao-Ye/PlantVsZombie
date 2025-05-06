const { ccclass, property } = cc._decorator;

@ccclass
export default class PlantCard extends cc.Component {
  @property
  public sunCost: number = 50;

  @property
  public resetTime: number = 5;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {}

  protected start(): void {}

  // update (dt) {}
}
