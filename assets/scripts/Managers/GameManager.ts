import DragManager from "./DragManager";
import GridManager from "./GridManager";
import PlantCardManager from "./PlantCardManager";
import PlantManager from "./PlantManager";
import ShovelManager from "./ShovelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager {
  private _isStart: boolean = false;
  private _plantManager: PlantManager = undefined;
  private _gridManager: GridManager = undefined;
  private _plantCardManager: PlantCardManager = undefined;
  private _dragManager: DragManager = undefined;
  private _shovelManager: ShovelManager = undefined;

  public init(
    plantCardLayer: cc.Node,
    zombieLayer: cc.Node,
    plantLayer: cc.Node,
    shovelLayer: cc.Node,
    dragLayer: cc.Node,
    shovelIcon: cc.Node,
    plantPrefabs: cc.Prefab[],
    plantCardPrefabs: cc.Prefab[],
    gridWidth: number,
    gridHeight: number,
    startX: number,
    startY: number,
    rows: number,
    cols: number
  ): void {
    this._plantManager = new PlantManager();
    this._gridManager = new GridManager();
    this._plantCardManager = new PlantCardManager();
    this._dragManager = new DragManager();
    this._shovelManager = new ShovelManager();

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
    this._plantCardManager.init(plantCardLayer, plantCardPrefabs);
    this._dragManager.init(dragLayer, this);
    this._shovelManager.init(shovelIcon, shovelLayer, this);
  }

  public loadGame(): void {
    this._plantCardManager.loadPlantCards();
    this._dragManager.registerTouchEvents();
    this._plantManager.loadPlants();
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
}
