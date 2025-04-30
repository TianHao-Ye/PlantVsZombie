import PlantCard from "../Characters/PlantCard";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlantCardManager extends cc.Component {
  @property([cc.Node])
  plantCardLayer: cc.Node = undefined;

  @property([cc.Prefab])
  plantCardPrefabs: cc.Prefab[] = [];

  private _plantCardPrefabMap: { [key: string]: cc.Prefab } = {};

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    for (const prefab of this.plantCardPrefabs) {
      const name = prefab.name;
      this._plantCardPrefabMap[name] = prefab;
    }
  }

  protected start(): void {}

  // update (dt) {}

  public loadPlantCards(): void {
    for (const cardPrefab of this.plantCardPrefabs) {
      const plantCard = cc.instantiate(cardPrefab);

      this.plantCardLayer.addChild(plantCard);
      plantCard.getComponent(PlantCard).dragManager =
        this.node.parent.getComponent(GameManager).dragManager;
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantCardPrefabMap[name] || null;
  }
}
