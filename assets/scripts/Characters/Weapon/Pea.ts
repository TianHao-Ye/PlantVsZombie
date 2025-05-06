const { ccclass, property } = cc._decorator;

@ccclass
export default class Pea extends cc.Component {
  private _flyTime: number = 10;

  // LIFE-CYCLE CALLBACKS:

  // update (dt) {}

  public playFlyingHorizontalMotion(): void {
    if (!this.node.parent) {
      return;
    }
    const targetX =
      this.node.parent.getPosition().x + this.node.parent.width / 2;

    cc.tween(this.node)
      .to(this._flyTime, { x: targetX }, { easing: "linear" })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }
}
