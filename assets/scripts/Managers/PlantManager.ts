const { ccclass, property } = cc._decorator;

@ccclass
export default class PlantManager extends cc.Component {
  @property(cc.Node)
  plantLayer: cc.Node = undefined;

  @property([cc.Prefab])
  plantPrefabs: cc.Prefab[] = [];

  private _plantPrefabMap: { [key: string]: cc.Prefab } = {};

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    for (const prefab of this.plantPrefabs) {
      const name = prefab.name;
      this._plantPrefabMap[name] = prefab;
    }
  }

  protected start(): void {}

  // update (dt) {}
  // plantSeed(plantType: string, position: cc.Vec2) {
  //     const prefab = this.getPrefabByType(plantType);
  //     if (!prefab) return;
  //     const plant = cc.instantiate(prefab);
  //     plant.parent = this.plantLayer;
  //     plant.setPosition(position);
  // }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantPrefabMap[name] || null;
  }
}
