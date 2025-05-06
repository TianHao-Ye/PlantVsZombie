import GameManager from "./GameManager";
import { IManager } from "./IManager";

export default class PlantCardManager implements IManager {
  private _gameManager: GameManager = undefined;
  private _plantCardPrefabs: cc.Prefab[] = [];
  private _plantCardPrefabMap: { [key: string]: cc.Prefab } = {};

  public init(plantCardPrefabs: cc.Prefab[], gameManager: GameManager): void {
    this._plantCardPrefabs = plantCardPrefabs;
    this._gameManager = gameManager;

    for (const prefab of plantCardPrefabs) {
      const name = prefab.name;
      this._plantCardPrefabMap[name] = prefab;
    }
    this._loadPlantCards();
  }

  private _loadPlantCards(): void {
    for (const cardPrefab of this._plantCardPrefabs) {
      const plantCard = cc.instantiate(cardPrefab);
      plantCard.name = cardPrefab.name;
      this._gameManager.getUiManager().addPlantCard(plantCard);
    }
  }

  public getPlantPrefabByName(name: string): cc.Prefab | null {
    return this._plantCardPrefabMap[name] || null;
  }
}
