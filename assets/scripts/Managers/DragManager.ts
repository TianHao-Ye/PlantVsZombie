import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragManager {
  private _dragLayer: cc.Node = undefined;
  private _gameManager: GameManager = undefined;
  private _draggingCard: cc.Node = undefined;

  public init(dragLayer: cc.Node, gameManager: GameManager): void {
    this._dragLayer = dragLayer;
    this._gameManager = gameManager;
  }

  public registerTouchEvents(): void {
    this._dragLayer.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this._dragLayer.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this._dragLayer.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
  }

  public unregisterTouchEvents(): void {
    this._dragLayer.off(
      cc.Node.EventType.TOUCH_START,
      this._onTouchStart,
      this
    );
    this._dragLayer.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this._dragLayer.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
  }

  private _onTouchStart(event: cc.Event.EventTouch): void {
    const touchPos = event.getLocation();

    const plantCardLayer = this._gameManager
      .getPlantCardManager()
      .getPlantCardLayer();

    const card = this._getCardUnderTouch(touchPos, plantCardLayer);
    if (card) {
      this._startDragging(card);
    }
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

  private _getCardUnderTouch(
    touchPos: cc.Vec2,
    plantCardLayer: cc.Node
  ): cc.Node | null {
    for (const card of plantCardLayer.children) {
      if (this._isCardUnderTouch(card, touchPos)) {
        return card;
      }
    }
    return null;
  }

  private _isCardUnderTouch(card: cc.Node, touchPos: cc.Vec2): boolean {
    return (
      card.getComponent("PlantCard") &&
      card.getBoundingBoxToWorld().contains(touchPos)
    );
  }

  private _parsePlantName(originalName: string): string {
    return originalName.replace("card_", "");
  }

  private _onTouchMove(event: cc.Event.EventTouch): void {
    if (!this._draggingCard) return;

    const touchPos = event.getLocation();
    const localPos = this._dragLayer.convertToNodeSpaceAR(touchPos);
    this._draggingCard.setPosition(localPos);
  }

  private _onTouchEnd(event: cc.Event.EventTouch): void {
    if (!this._draggingCard) return;

    const touchPos = event.getLocation();
    const localPos = this._dragLayer.convertToNodeSpaceAR(touchPos);
    const gridPos = this._gameManager
      .getGridManager()
      ._worldPosToGrid(localPos);

    if (gridPos) {
      const plantNode = cc.instantiate(
        this._gameManager
          .getPlantManager()
          .getPlantPrefabByName(this._parsePlantName(this._draggingCard.name))
      );

      if (plantNode) {
        this._gameManager
          .getGridManager()
          .plantAt(gridPos.row, gridPos.col, plantNode);
      }
    }

    this._draggingCard.destroy();
    this._draggingCard = undefined;
  }
}
