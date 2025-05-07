const { ccclass, property } = cc._decorator;

@ccclass
export default class Pea extends cc.Component {
//   private _flyTime: number = 10;
  private _flySpeed: number = 100;

  // LIFE-CYCLE CALLBACKS:

  protected update(dt: number): void {
    if (this.node.parent) {
      let currentX = this.node.x;
      this.node.x += this._flySpeed * dt;

      if (this.node.x > this.node.parent.width / 2) {
        this.node.destroy();
      }
    }
  }

  //   public playFlyingHorizontalMotion(): void {
  //     if (!this.node.parent) {
  //       return;
  //     }
  //     const targetX =
  //       this.node.parent.getPosition().x + this.node.parent.width / 2;

  //     cc.tween(this.node)
  //       .to(this._flyTime, { x: targetX }, { easing: "linear" })
  //       .call(() => {
  //         this.node.destroy();
  //       })
  //       .start();
  //   }
}
