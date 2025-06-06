import GameScheduler from "../Functional/GameScheduler";
import TouchEventManager from "../Functional/TouchEventManager";
import DragManager from "./DragManager";
import GridManager from "./GridManager";
import { IManager } from "./IManager";
import PlantCardManager from "./PlantCardManager";
import PlantManager from "./PlantManager";
import ShovelManager from "./ShovelManager";
import SunManager from "./SunManager";
import UIManager from "./UIManager";
import WeaponManager from "./WeaponManager";
import ZoobieManager from "./ZombieManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager implements IManager {
  private static _instance: GameManager = undefined;
  private _plantManager: PlantManager = undefined;
  private _gridManager: GridManager = undefined;
  private _plantCardManager: PlantCardManager = undefined;
  private _dragManager: DragManager = undefined;
  private _shovelManager: ShovelManager = undefined;
  private _sunManager: SunManager = undefined;
  private _uiManager: UIManager = undefined;
  private _gameScheduler: GameScheduler = undefined;
  private _touchEventManager: TouchEventManager = undefined;
  private _weaponManager: WeaponManager = undefined;
  private _zombieManager: ZoobieManager = undefined;

  public static getInstance(): GameManager {
    if (!this._instance) {
      this._instance = new GameManager();
    }
    return this._instance;
  }

  public init(
    zombieLayer: cc.Node,
    plantLayer: cc.Node,
    shovelLayer: cc.Node,
    dragLayer: cc.Node,
    sunLayer: cc.Node,
    scheduleLayer: cc.Node,
    touchEventLayer: cc.Node,
    weaponLayer: cc.Node,
    plantPrefabs: cc.Prefab[],
    plantCardPrefabs: cc.Prefab[],
    sunPrefab: cc.Prefab,
    weaponPrefabs: cc.Prefab[],
    zombiePrefabs: cc.Prefab[],
    gridWidth: number,
    gridHeight: number,
    startX: number,
    startY: number,
    rows: number,
    cols: number,
    shovel: cc.Node,
    playButton: cc.Node,
    sunLabel: cc.Label,
    sunIcon: cc.Node,
    plantCardContainer: cc.Node,
    zombiesWonLabel: cc.Node
  ): void {
    this._plantManager = new PlantManager();
    this._gridManager = new GridManager();
    this._plantCardManager = new PlantCardManager();
    this._dragManager = new DragManager();
    this._shovelManager = new ShovelManager();
    this._sunManager = new SunManager();
    this._uiManager = new UIManager();
    this._gameScheduler = scheduleLayer.getComponent(GameScheduler);
    this._touchEventManager = new TouchEventManager();
    this._weaponManager = new WeaponManager();
    this._zombieManager = new ZoobieManager();

    this._uiManager.init(
      shovel,
      playButton,
      sunLabel,
      sunIcon,
      plantCardContainer,
      zombiesWonLabel,
      this,
      this._shovelManager.toggleShovelMode.bind(this._shovelManager)
    );
    this._plantManager.init(plantLayer, plantPrefabs, this);
    this._gridManager.init(
      gridWidth,
      gridHeight,
      startX,
      startY,
      rows,
      cols,
      this
    );
    this._plantCardManager.init(plantCardPrefabs, this);
    this._dragManager.init(dragLayer, this);
    this._shovelManager.init(shovelLayer, this);
    this._sunManager.init(sunLayer, sunPrefab, this);
    this._touchEventManager.init(touchEventLayer, this);
    this._weaponManager.init(weaponLayer, weaponPrefabs, this);
    this._zombieManager.init(zombieLayer, zombiePrefabs, this);
  }

  public playGame(): void {
    this._uiManager.playGame();
    this._plantCardManager.playGame();
    this._sunManager.playGame();
    this._touchEventManager.playGame();
    this._zombieManager.playGame();
  }

  public endGame(): void {
    this._uiManager.endGame();
    this._gameScheduler.stopAll();
    this._sunManager.endGame();
    this._zombieManager.endGame();
    this._plantManager.endGame();
    this._gridManager.endGame();
    this._shovelManager.endGame();
    this._touchEventManager.endGame();
  }

  public update(dt: number): void {
    this._zombieManager.update(dt);
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

  public getSunManager(): SunManager {
    return this._sunManager;
  }

  public getGameScheduler(): GameScheduler {
    return this._gameScheduler;
  }

  public getTouchEventManager(): TouchEventManager {
    return this._touchEventManager;
  }

  public getWeaponManager(): WeaponManager {
    return this._weaponManager;
  }

  public getZombieManager(): ZoobieManager {
    return this._zombieManager;
  }
}
