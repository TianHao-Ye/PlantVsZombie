const { ccclass, property } = cc._decorator;

@ccclass
export default class PlantManager {
  private _plantLayer: cc.Node = undefined;
  private _plantPrefabs: cc.Prefab[] = [];
  private _plantPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(plantLayer: cc.Node, plantPrefabs: cc.Prefab[]): void {
    this._plantLayer = plantLayer;
    this._plantPrefabs = plantPrefabs;
  }

  public loadPlants(): void {
    for (const prefab of this._plantPrefabs) {
      const name = prefab.name;
      this._plantPrefabMap[name] = prefab;
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantPrefabMap[name] || null;
  }

  public getPlantLayer(): cc.Node {
    return this._plantLayer;
  }
}
