import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
  @property(cc.Node)
  shovel: cc.Node = undefined;

  @property(cc.Node)
  playButton: cc.Node = undefined;

  @property(cc.Label)
  sunLabel: cc.Label = undefined;

  @property(cc.Node)
  plantCardContainer: cc.Node = undefined;

  private _clickShovelCallback?: () => void = undefined;
  private _gameManager: GameManager = undefined;

  // LIFE-CYCLE CALLBACKS:
  public init(gameManager: GameManager, shovelCallback?: () => void): void {
    this._gameManager = gameManager;
    this._clickShovelCallback = shovelCallback;
  }

  protected onLoad(): void {
    this._loadUiElements();
    this._bindShovelEvents();
  }

  start() {}

  // update (dt) {}

  private _bindShovelEvents(): void {
    this.shovel.on(cc.Node.EventType.TOUCH_END, this._onClickShovel, this);
  }

  private _onClickShovel(): void {
    this._gameManager.getShovelManager().toggleShovelMode();
  }

  private _loadUiElements(): void {
    this.shovel.active = true;
    this.playButton.active = true;
  }

  public setShovelOpacity(opacity: number): void {
    this.shovel.opacity = opacity;
  }

  public getShovelIcon(): cc.Node {
    return this.shovel;
  }

  public updateSunLabel(value: number): void {
    this.sunLabel.string = value.toString();
  }

  public addPlantCard(cardNode: cc.Node): void {
    this.plantCardContainer.addChild(cardNode);
  }
}
