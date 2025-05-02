import GameManager from "./Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
  @property([cc.Node])
  plantCardLayer: cc.Node = undefined;

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

  @property(cc.Node)
  shovelIcon: cc.Node = undefined;

  @property([cc.Prefab])
  plantPrefabs: cc.Prefab[] = [];

  @property([cc.Prefab])
  plantCardPrefabs: cc.Prefab[] = [];

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

  private _gameManager: GameManager = undefined;

  protected onLoad(): void {
    GameManager.getInstance().init(this.plantCardLayer,
      this.zombieLayer,
      this.plantLayer,
      this.shovelLayer,
      this.dragLayer,
      this.sunLayer,
      this.shovelIcon,
      this.plantPrefabs,
      this.plantCardPrefabs,
      this.gridWidth,
      this.gridHeight,
      this.startX,
      this.startY,
      this.rows,
      this.cols);
  }
}
