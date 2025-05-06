import WeaponManager from "../../Managers/WeaponManager";
import Plant from "./Plant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeaShooter extends Plant {
  private _weaponManager: WeaponManager = undefined;

  protected attack(): void {
    cc.log("Peashooter shoots a bullet!");
  }

  private _spawnWeapon(): void {
    this.schedule(() => {
      this._weaponManager.createWeapon(this.node.name, this.node.getPosition());
    }, this.attackInterval);
  }

  public setManager(weaponManager: WeaponManager): void {
    this._weaponManager = weaponManager;
    this._weaponManager && this._spawnWeapon();
  }
}
