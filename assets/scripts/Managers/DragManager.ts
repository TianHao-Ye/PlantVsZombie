import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragManager implements IManager {
  private _dragLayer: cc.Node = undefined;
  private _gameManager: GameManager = undefined;
  private _draggingCard: cc.Node = undefined;

  public init(dragLayer: cc.Node, gameManager: GameManager): void {
    this._dragLayer = dragLayer;
    this._gameManager = gameManager;
  }

  public onGlobalTouchStart(touchPos: cc.Vec2): boolean {
    const uiManager = this._gameManager.getUiManager();
    const cardContainer = uiManager.plantCardContainer;

    for (const card of cardContainer.children) {
      if (card.getBoundingBoxToWorld().contains(touchPos)) {
        this._startDragging(card);
        return true;
      }
    }
    return false;
  }

  public onGlobalTouchMove(touchPos: cc.Vec2): void {
    if (!this._draggingCard) return;

    const localPos = this._dragLayer.convertToNodeSpaceAR(touchPos);
    this._draggingCard.setPosition(localPos);
  }

  public onGlobalTouchEnd(touchPos: cc.Vec2): void {
    if (!this._draggingCard) return;

    const localPos = this._dragLayer.convertToNodeSpaceAR(touchPos);
    const gridPos = this._gameManager.getGridManager().worldPosToGrid(localPos);
    gridPos &&
      this._gameManager
        .getPlantManager()
        .plantOnLayer(gridPos, this._draggingCard);

    this._draggingCard.destroy();
    this._draggingCard = undefined;
  }

  private _startDragging(originCard: cc.Node): void {
    const cloneCard = cc.instantiate(originCard);
    const worldPos = originCard.convertToWorldSpaceAR(cc.Vec2.ZERO);
    const localPos = this._dragLayer.convertToNodeSpaceAR(worldPos);

    this._dragLayer.addChild(cloneCard);
    cloneCard.setPosition(localPos);
    cloneCard.opacity = 100;

    this._draggingCard = cloneCard;
  }
}
