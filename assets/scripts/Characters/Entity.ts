const { ccclass, property } = cc._decorator;

@ccclass
export default class Entity extends cc.Component {
  @property
  public health: number = 100;

  @property
  public damage: number = 10;

  @property
  public attackInterval: number = 1.5;

  public takeDamage(dmg: number) {
    this.health -= dmg;
    if (this.health <= 0) {
      this.die();
    }
  }

  public attack(): void {}

  protected die() {
    this.node.destroy();
  }
}
