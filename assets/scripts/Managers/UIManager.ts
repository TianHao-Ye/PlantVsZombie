import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager implements IManager {
  public shovelButton: cc.Node = undefined;
  public playButton: cc.Node = undefined;
  public sunLabel: cc.Label = undefined;
  public sunIcon: cc.Node = undefined;
  public plantCardContainer: cc.Node = undefined;
  public zombiesWonLabel: cc.Node = undefined;
  private _clickShovelCallback?: () => void = undefined;
  private _gameManager: GameManager = undefined;

  public init(
    shovelButton: cc.Node,
    playButton: cc.Node,
    sunLabel: cc.Label,
    sunIcon: cc.Node,
    plantCardContainer: cc.Node,
    zombiesWonLabel: cc.Node,
    gameManager: GameManager,
    shovelCallback?: () => void
  ): void {
    this.shovelButton = shovelButton;
    this.playButton = playButton;
    this.sunLabel = sunLabel;
    this.sunIcon = sunIcon;
    this.plantCardContainer = plantCardContainer;
    this.zombiesWonLabel = zombiesWonLabel;
    this._gameManager = gameManager;
    this._clickShovelCallback = shovelCallback;
    this.playButton.active = true;
  }

  public playGame(): void {
    this.playButton.active = false;
    this.shovelButton.active = true;
    this.plantCardContainer.active = true;
    this.sunLabel.node.active = true;
    this.sunIcon.active = true;
    this.zombiesWonLabel.active = false;
  }

  public endGame(): void {
    this.shovelButton.active = false;
    this.plantCardContainer.active = false;
    this.sunLabel.node.active = false;
    this.sunIcon.active = false;
    this.zombiesWonLabel.active = true;
    this.clearPlantCard();
    this.updateSunLabel(0);
  }

  public onGlobalTouchStart(touchPos: cc.Vec2): boolean {
    if (this.shovelButton.getBoundingBoxToWorld().contains(touchPos)) {
      this._gameManager.getShovelManager().toggleShovelMode();
      return true;
    }
    return false;
  }

  public setShovelOpacity(opacity: number): void {
    this.shovelButton.opacity = opacity;
  }

  public getShovelButton(): cc.Node {
    return this.shovelButton;
  }

  public updateSunLabel(value: number): void {
    this.sunLabel.string = value.toString();
  }

  public addPlantCard(cardNode: cc.Node): void {
    this.plantCardContainer.addChild(cardNode);
  }

  public clearPlantCard(): void {
    this.plantCardContainer.removeAllChildren();
  }
}
