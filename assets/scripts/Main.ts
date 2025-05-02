import GameManager from "./Managers/GameManager";
import UIManager from "./Managers/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
  //layers
  @property(cc.Node)
  zombieLayer: cc.Node = undefined;

  @property(cc.Node)
  plantLayer: cc.Node = undefined;

  @property(cc.Node)
  shovelLayer: cc.Node = undefined;

  @property(cc.Node)
  dragLayer: cc.Node = undefined;

  @property(cc.Node)
  sunLayer: cc.Node = undefined;

  //prefabs
  @property([cc.Prefab])
  plantPrefabs: cc.Prefab[] = [];

  @property([cc.Prefab])
  plantCardPrefabs: cc.Prefab[] = [];

  //grid properties
  @property
  gridWidth: number = 165.7;

  @property
  gridHeight: number = 144.17;

  @property
  startX: number = -720;

  @property
  startY: number = 400;

  @property
  rows: number = 6;

  @property
  cols: number = 7;

  //ui elements
  @property(cc.Node)
  shovel: cc.Node = undefined;

  @property(cc.Node)
  playButton: cc.Node = undefined;

  @property(cc.Label)
  sunLabel: cc.Label = undefined;

  @property(cc.Node)
  plantCardContainer: cc.Node = undefined;

  protected onLoad(): void {
    GameManager.getInstance().init(
      this.zombieLayer,
      this.plantLayer,
      this.shovelLayer,
      this.dragLayer,
      this.sunLayer,
      this.plantPrefabs,
      this.plantCardPrefabs,
      this.gridWidth,
      this.gridHeight,
      this.startX,
      this.startY,
      this.rows,
      this.cols,
      this.shovel,
      this.playButton,
      this.sunLabel,
      this.plantCardContainer
    );
  }
}
