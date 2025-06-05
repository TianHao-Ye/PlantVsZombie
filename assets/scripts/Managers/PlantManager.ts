import Entity from "../Characters/Entity";
import PeaShooter from "../Characters/Plant/PeaShooter";
import Plant from "../Characters/Plant/Plant";
import SunFlower from "../Characters/Plant/SunFlower";
import PlantCard from "../Characters/PlantCard";
import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

const PlantScriptMap: { [key: string]: string } = {
  sun_flower: "SunFlower",
  pea_shooter: "PeaShooter",
};

@ccclass
export default class PlantManager implements IManager {
  private _gameManager: GameManager = undefined;
  private _plantLayer: cc.Node = undefined;
  private _plantPrefabs: cc.Prefab[] = [];
  private _plantPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(
    plantLayer: cc.Node,
    plantPrefabs: cc.Prefab[],
    gameManager: GameManager
  ): void {
    this._plantLayer = plantLayer;
    this._plantPrefabs = plantPrefabs;
    this._gameManager = gameManager;
    this._loadPlants();
  }

  private _loadPlants(): void {
    for (const prefab of this._plantPrefabs) {
      const name = prefab.name;
      this._plantPrefabMap[name] = prefab;
    }
  }

  private _getWeaponManagerForPlant(plantName: string): IManager {
    switch (plantName) {
      case "sun_flower":
        return this._gameManager.getSunManager();
      default:
        return this._gameManager.getWeaponManager();
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantPrefabMap[name] || null;
  }

  private _convertNamePlantCardToPlant(originalName: string): string {
    return originalName.replace("card_", "");
  }

  public handleAttack(
    plantNode: cc.Node,
    zombieOnGridPos: { row: number; col: number },
    damage: number
  ): void {
    const plantScriptName = PlantScriptMap[plantNode.name];
    const plantScript = plantNode.getComponent(plantScriptName);
    const plantLive = plantScript.takeDamage(damage);
    !plantLive &&
      this._gameManager
        .getGridManager()
        .unplantFromGrid(zombieOnGridPos.row, zombieOnGridPos.col);
  }

  public unplantFromLayer(): void {}

  public plantOnLayer(
    gridPos: { row: number; col: number },
    plantCard: cc.Node
  ): void {
    const plantName = this._convertNamePlantCardToPlant(plantCard.name);
    const plantPrefab = this.getPlantPrefabByName(plantName);

    if (!plantPrefab) {
      return;
    }

    const gridManager = this._gameManager.getGridManager();
    const sunManager = this._gameManager.getSunManager();
    if (!gridManager.isOccupied(gridPos.row, gridPos.col)) {
      return;
    }
    // if (!sunManager.useSunValue(plantCard.getComponent(PlantCard).sunCost)) {
    //   return;
    // }

    // create plant node
    const plantNode = cc.instantiate(plantPrefab);
    const worldPos = gridManager.gridToWorldPos(gridPos.row, gridPos.col);
    this._plantLayer.addChild(plantNode);
    plantNode.setPosition(worldPos);

    //mark on grid
    gridManager.plantOnGrid(gridPos.row, gridPos.col, plantNode);

    //assign manager
    const manager: IManager = this._getWeaponManagerForPlant(plantName);
    const plantScript = PlantScriptMap[plantName];
    manager &&
      plantScript &&
      plantNode.getComponent(plantScript).setManager(manager);
  }
}
