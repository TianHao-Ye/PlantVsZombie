const { ccclass, property } = cc._decorator;

@ccclass
export default class Entity extends cc.Component {
  @property
  public health: number = 100;

  @property
  public damage: number = 10;

  @property
  public attackInterval: number = 1.5;

  public takeDamage(dmg: number): boolean {
    const plantLive = true;
    this.health -= dmg;
    if (this.health <= 0) {
      this.die();
      return !plantLive;
    }
    return plantLive;
  }

  protected attack(): void {}

  protected die() {
    cc.Tween.stopAllByTarget(this.node);
    this.node.destroy();
  }

  public getHealth(): number {
    return this.health;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getAttackInterval(): number {
    return this.attackInterval;
  }
}
