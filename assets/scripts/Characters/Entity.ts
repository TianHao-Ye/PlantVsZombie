const { ccclass, property } = cc._decorator;

@ccclass
export default class Entity extends cc.Component {
  @property
  public health: number = 100;

  public takeDamage(dmg: number) {
    this.health -= dmg;
    if (this.health <= 0) {
      this.die();
    }
  }

  protected die() {
    this.node.destroy();
  }
}
