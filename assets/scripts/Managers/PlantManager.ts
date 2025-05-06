import PlantCard from "../Characters/PlantCard";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlantManager {
  private _plantLayer: cc.Node = undefined;
  private _plantPrefabs: cc.Prefab[] = [];
  private _plantPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(plantLayer: cc.Node, plantPrefabs: cc.Prefab[]): void {
    this._plantLayer = plantLayer;
    this._plantPrefabs = plantPrefabs;
    this._loadPlants();
  }

  private _loadPlants(): void {
    for (const prefab of this._plantPrefabs) {
      const name = prefab.name;
      this._plantPrefabMap[name] = prefab;
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantPrefabMap[name] || null;
  }

  private _parsePlantCardName(originalName: string): string {
    return originalName.replace("card_", "");
  }

  public plantOnLayer(
    gridPos: { row: number; col: number },
    plantCard: cc.Node
  ): void {
    const plantName = this._parsePlantCardName(plantCard.name);

    const plantPrefab = this.getPlantPrefabByName(plantName);

    if (!plantPrefab) {
      return;
    }

    const gridManager = GameManager.getInstance().getGridManager();
    const sunManager = GameManager.getInstance().getSunManager();
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
  }
}
