import GameManager from "./GameManager";
import { IManager } from "./IManager";
import Pea from "../Characters/Weapon/Pea";

const { ccclass, property } = cc._decorator;

const PlantWeaponMap: { [key: string]: string } = {
  pea_shooter: "pea",
};

const WeaponComponentMap: { [key: string]: new () => cc.Component } = {
  pea: Pea,
};

@ccclass
export default class WeaponManager implements IManager {
  private _gameManager: GameManager = undefined;
  private _weaponLayer: cc.Node = undefined;
  private _weaponPrefabs: cc.Prefab[] = [];
  private _weaponPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(
    weaponLayer: cc.Node,
    weaponPrefabs: cc.Prefab[],
    gameManager: GameManager
  ): void {
    this._gameManager = gameManager;
    this._weaponLayer = weaponLayer;
    this._weaponPrefabs = weaponPrefabs;

    for (const prefab of this._weaponPrefabs) {
      const name = prefab.name;
      this._weaponPrefabMap[name] = prefab;
    }
  }

  public getWeaponPrefabByName(name: string): cc.Prefab | null {
    return this._weaponPrefabMap[name] || null;
  }

  public createWeapon(plantName: string, startPos: cc.Vec2): void {
    const weaponName = PlantWeaponMap[plantName];
    if (!weaponName) {
      return;
    }

    const yOffset = 20;
    const xOffset = 30;
    startPos.x += xOffset;
    startPos.y += yOffset;

    let newWeapon: cc.Node = this._createSingleWeaponNode(weaponName);
    if (!newWeapon) {
      return;
    }

    this._weaponLayer.addChild(newWeapon);
    newWeapon.setPosition(startPos);

    // const weaponClass = WeaponComponentMap[weaponName];
    // if (!weaponClass) {
    //   return;
    // }
    // newWeapon.getComponent(weaponClass).playFlyingHorizontalMotion();
  }

  private _createSingleWeaponNode(weaponName: string): cc.Node {
    const weaponPrefab = this.getWeaponPrefabByName(weaponName);
    if (weaponPrefab) {
      return cc.instantiate(weaponPrefab);
    }
    return null;
  }
}
