import DragManager from "./DragManager";
import GridManager from "./GridManager";
import PlantCardManager from "./PlantCardManager";
import PlantManager from "./PlantManager";
import ShovelManager from "./ShovelManager";
import SunManager from "./SunManager";
import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager {
  private static _instance: GameManager = undefined;
  private _plantManager: PlantManager = undefined;
  private _gridManager: GridManager = undefined;
  private _plantCardManager: PlantCardManager = undefined;
  private _dragManager: DragManager = undefined;
  private _shovelManager: ShovelManager = undefined;
  private _sunManager: SunManager = undefined;
  private _uiManager: UIManager = undefined;

  public static getInstance(): GameManager {
    if (!this._instance) {
      return new GameManager();
    }
    return this._instance;
  }

  public init(
    zombieLayer: cc.Node,
    plantLayer: cc.Node,
    shovelLayer: cc.Node,
    dragLayer: cc.Node,
    sunLayer: cc.Node,
    plantPrefabs: cc.Prefab[],
    plantCardPrefabs: cc.Prefab[],
    gridWidth: number,
    gridHeight: number,
    startX: number,
    startY: number,
    rows: number,
    cols: number,
    shovel: cc.Node,
    playButton: cc.Node,
    sunLabel: cc.Label,
    plantCardContainer: cc.Node
  ): void {
    this._plantManager = new PlantManager();
    this._gridManager = new GridManager();
    this._plantCardManager = new PlantCardManager();
    this._dragManager = new DragManager();
    this._shovelManager = new ShovelManager();
    this._sunManager = new SunManager();
    this._uiManager = new UIManager();
    this._uiManager.init(
      shovel,
      playButton,
      sunLabel,
      plantCardContainer,
      this,
      this._shovelManager.toggleShovelMode.bind(this._shovelManager)
    );
    this._plantManager.init(plantLayer, plantPrefabs);
    this._gridManager.init(
      gridWidth,
      gridHeight,
      startX,
      startY,
      rows,
      cols,
      this
    );
    this._plantCardManager.init(this, plantCardPrefabs);
    this._dragManager.init(dragLayer, this);
    this._shovelManager.init(shovelLayer, this);
    this._sunManager.init(sunLayer);
  }

  //get managers
  public getPlantCardManager(): PlantCardManager {
    return this._plantCardManager;
  }

  public getGridManager(): GridManager {
    return this._gridManager;
  }

  public getPlantManager(): PlantManager {
    return this._plantManager;
  }

  public getDragManager(): DragManager {
    return this._dragManager;
  }

  public getShovelManager(): ShovelManager {
    return this._shovelManager;
  }

  public getUiManager(): UIManager {
    return this._uiManager;
  }
}
