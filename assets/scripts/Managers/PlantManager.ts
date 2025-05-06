import SunFlower from "../Characters/Plant/SunFlower";
import PlantCard from "../Characters/PlantCard";
import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

const PlantComponentMap: { [key: string]: new () => cc.Component } = {
  sun_flower: SunFlower,
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

  private _getManagerForPlant(plantName: string): IManager {
    switch (plantName) {
      case "sun_flower":
        return this._gameManager.getSunManager();
      default:
        return null;
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantPrefabMap[name] || null;
  }

  private _convertNamePlantCardToPlant(originalName: string): string {
    return originalName.replace("card_", "");
  }

  private _convertNamePlantCardToScript(originalName: string): string {
    return originalName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

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
    if (!gridManager.canPlant(gridPos.row, gridPos.col)) {
      return;
    }
    if (!sunManager.useSunValue(plantCard.getComponent(PlantCard).sunCost)) {
      return;
    }

    // create plant node
    const plantNode = cc.instantiate(plantPrefab);
    const worldPos = gridManager.gridToWorldPos(gridPos.row, gridPos.col);
    this._plantLayer.addChild(plantNode);
    plantNode.setPosition(worldPos);

    //mark on grid
    gridManager.plantOnGrid(gridPos.row, gridPos.col, plantNode);

    //assign manager
    const manager: IManager = this._getManagerForPlant(plantName);
    const plantClass = PlantComponentMap[plantName];
    // manager && plantClass && plantNode.getComponent(plantClass).setManager(manager);
    if (manager) {
      plantNode
        .getComponent(this._convertNamePlantCardToScript(plantName))
        .setManager(manager);
    }
  }
}
