export default class PlantCardManager {
  private _plantCardLayer: cc.Node = undefined;
  private _plantCardPrefabs: cc.Prefab[] = [];
  private _plantCardPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(plantCardLayer: cc.Node, plantCardPrefabs: cc.Prefab[]): void {
    this._plantCardLayer = plantCardLayer;
    this._plantCardPrefabs = plantCardPrefabs;

    for (const prefab of plantCardPrefabs) {
      const name = prefab.name;
      this._plantCardPrefabMap[name] = prefab;
    }
    
  }

  public loadPlantCards(): void {
    for (const cardPrefab of this._plantCardPrefabs) {
      const plantCard = cc.instantiate(cardPrefab);
      plantCard.name = cardPrefab.name;
      this._plantCardLayer.addChild(plantCard);
    }
  }

  public getPlantCardLayer(): cc.Node {
    return this._plantCardLayer;
  }


  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantCardPrefabMap[name] || null;
  }
}
