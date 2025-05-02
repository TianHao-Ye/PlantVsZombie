const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
  @property(cc.Node)
  shovel: cc.Node = undefined;

  @property(cc.Node)
  playButton: cc.Node = undefined;

  @property(cc.Label)
  sunLabel: cc.Label = undefined;

  @property(cc.Node)
  plantCardContainer: cc.Node = undefined;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this._loadUiElements();
  }

  start() {}

  // update (dt) {}

  private _loadUiElements(): void {
    this.shovel.active = true;
    this.playButton.active = true;
  }

  public updateSunLabel(value: number): void {
    this.sunLabel.string= value.toString();
  }

  public addPlantCard(cardNode: cc.Node): void {
    this.plantCardContainer.addChild(cardNode);
  }
}
