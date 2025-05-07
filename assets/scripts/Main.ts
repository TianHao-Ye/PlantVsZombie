import GameManager from "./Managers/GameManager";
import UIManager from "./Managers/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
  // layers
  @property(cc.Node)
  public zombieLayer: cc.Node = undefined;

  @property(cc.Node)
  public plantLayer: cc.Node = undefined;

  @property(cc.Node)
  public shovelLayer: cc.Node = undefined;

  @property(cc.Node)
  public dragLayer: cc.Node = undefined;

  @property(cc.Node)
  public sunLayer: cc.Node = undefined;

  @property(cc.Node)
  public scheduleLayer: cc.Node = undefined;

  @property(cc.Node)
  public touchEventLayer: cc.Node = undefined;

  @property(cc.Node)
  public weaponLayer: cc.Node = undefined;

  // prefabs
  @property([cc.Prefab])
  public plantPrefabs: cc.Prefab[] = [];

  @property([cc.Prefab])
  public plantCardPrefabs: cc.Prefab[] = [];

  @property(cc.Prefab)
  public sunPrefab: cc.Prefab = undefined;

  @property([cc.Prefab])
  public weaponPrefabs: cc.Prefab[] = [];

  @property([cc.Prefab])
  public zombiePrefabs: cc.Prefab[] = [];

  // grid properties
  @property
  public gridWidth: number = 165.7;

  @property
  public gridHeight: number = 144.17;

  @property
  public startX: number = -720;

  @property
  public startY: number = 400;

  @property
  public rows: number = 6;

  @property
  public cols: number = 7;

  // UI elements
  @property(cc.Node)
  public shovel: cc.Node = undefined;

  @property(cc.Node)
  public playButton: cc.Node = undefined;

  @property(cc.Label)
  public sunLabel: cc.Label = undefined;

  @property(cc.Node)
  public sunIcon: cc.Node = undefined;

  @property(cc.Node)
  public plantCardContainer: cc.Node = undefined;

  @property
  public unitSunValue: number = 25;

  protected onLoad(): void {
    cc.director.getCollisionManager().enabled = true;
    GameManager.getInstance().init(
      this.zombieLayer,
      this.plantLayer,
      this.shovelLayer,
      this.dragLayer,
      this.sunLayer,
      this.scheduleLayer,
      this.touchEventLayer,
      this.weaponLayer,
      this.plantPrefabs,
      this.plantCardPrefabs,
      this.sunPrefab,
      this.weaponPrefabs,
      this.zombiePrefabs,
      this.gridWidth,
      this.gridHeight,
      this.startX,
      this.startY,
      this.rows,
      this.cols,
      this.shovel,
      this.playButton,
      this.sunLabel,
      this.sunIcon,
      this.plantCardContainer,
      this.unitSunValue
    );
  }
}
