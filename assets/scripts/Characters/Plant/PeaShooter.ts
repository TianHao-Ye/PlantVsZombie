import WeaponManager from "../../Managers/WeaponManager";
import Plant from "./Plant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PeaShooter extends Plant {
  private _weaponManager: WeaponManager = undefined;

  public setManager(weaponManager: WeaponManager): void {
    this._weaponManager = weaponManager;
    this._weaponManager && this.attack();
  }

  public attack(): void {
    this._spawnWeapon();
  }

  private _spawnWeapon(): void {
    this.schedule(() => {
      this._weaponManager.createWeapon(this.node.name, this.node.getPosition());
    }, this.attackInterval);
  }
}
