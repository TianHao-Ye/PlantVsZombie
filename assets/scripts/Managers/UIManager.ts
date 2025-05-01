const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
  @property(cc.Node)
  shovel: cc.Node = undefined;

  @property(cc.Node)
  playButton: cc.Node = undefined;

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
}
