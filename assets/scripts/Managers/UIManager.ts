import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager {
  public shovel: cc.Node = undefined;
  public playButton: cc.Node = undefined;
  public sunLabel: cc.Label = undefined;
  public sunIcon: cc.Node = undefined;
  public plantCardContainer: cc.Node = undefined;
  private _clickShovelCallback?: () => void = undefined;
  private _gameManager: GameManager = undefined;

  public init(
    shovel: cc.Node,
    playButton: cc.Node,
    sunLabel: cc.Label,
    sunIcon: cc.Node,
    plantCardContainer: cc.Node,
    gameManager: GameManager,
    shovelCallback?: () => void
  ): void {
    this.shovel = shovel;
    this.playButton = playButton;
    this.sunLabel = sunLabel;
    this.sunIcon = sunIcon;
    this.plantCardContainer = plantCardContainer;
    this._gameManager = gameManager;
    this._clickShovelCallback = shovelCallback;

    this.loadUiManager();
  }

  protected loadUiManager(): void {
    this._loadUiElements();
    this._registerShovelEvents();
  }

  private _registerShovelEvents(): void {
    this.shovel.on(cc.Node.EventType.TOUCH_END, this._onTouchShovel, this);
  }

  private _onTouchShovel(): void {
    this._gameManager.getShovelManager().toggleShovelMode();
  }

  private _loadUiElements(): void {
    this.shovel.active = true;
    this.playButton.active = true;
    this.plantCardContainer.active = true;
    this.sunLabel.node.active = true;
    this.sunIcon.active = true;
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
