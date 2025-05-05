const { ccclass, property } = cc._decorator;

@ccclass
export default class Sun extends cc.Component {
  @property
  public lifeTime: number = 5;

  private _isCollected: boolean = false;
  private _onCollectedCB: () => void;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {}

  protected start(): void {}

  // update (dt) {}

  public playFallMotion(targetPos: cc.Vec2): void {
    cc.tween(this.node)
      .to(3, { y: targetPos.y }, { easing: "linear" })
      .call(() => {
        this._playFadeMotion();
      })
      .start();
  }

  public playCollectedMotion(targetPos: cc.Vec2, cb: () => void): void {
    this._onCollectedCB = cb;
    if (this._onCollectedCB) {
      cc.tween(this.node)
        .to(
          0.5,
          { position: cc.v3(targetPos.x, targetPos.y, 0) },
          { easing: "quadOut" }
        )
        .call(() => {
          this.node.destroy();
          this._onCollectedCB();
        })
        .start();
    }
  }

  public _playFadeMotion(): void {
    cc.tween(this.node)
      .to(this.lifeTime, { opacity: 0.5 * this.node.opacity })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }
}
