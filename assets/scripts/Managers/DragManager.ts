import GameManager from "./GameManager";
import GridManager from "./GridManager";
import PlantCardManager from "./PlantCardManager";
import PlantManager from "./PlantManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragManager extends cc.Component {
  @property(cc.Node)
  dragLayer: cc.Node = undefined;

  @property(GameManager)
  gameManager: GameManager = undefined;

  private _draggingCard: cc.Node = undefined;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this._registerTouchEvents();
  }

  start() {}

  // update (dt) {}

  private _registerTouchEvents(): void {
    this.dragLayer.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.dragLayer.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.dragLayer.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
  }

  private _startDragging(originCard: cc.Node): void {
    const cloneCard = cc.instantiate(originCard);
    const worldPos = originCard.convertToWorldSpaceAR(cc.Vec2.ZERO);
    const localPos = this.dragLayer.convertToNodeSpaceAR(worldPos);

    this.dragLayer.addChild(cloneCard);
    cloneCard.setPosition(localPos);
    cloneCard.opacity = 100;

    this._draggingCard = cloneCard;
  }

  private _onTouchStart(event: cc.Event.EventTouch): void {
    const touchPos = event.getLocation();

    const plantCardLayer =
      this.gameManager.getScriptPlantCardManager().plantCardLayer;

    const card = this._getCardUnderTouch(touchPos, plantCardLayer);
    if (card) {
      this._startDragging(card);
    }
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
    const localPos = this.dragLayer.convertToNodeSpaceAR(touchPos);
    this._draggingCard.setPosition(localPos);
  }

  private _onTouchEnd(event: cc.Event.EventTouch): void {
    if (!this._draggingCard) return;

    const touchPos = event.getLocation();
    const localPos = this.dragLayer.convertToNodeSpaceAR(touchPos);
    const gridPos = this.gameManager.gridManager
      .getComponent(GridManager)
      ._worldPosToGrid(localPos);

    if (gridPos) {
      const plantNode = cc.instantiate(
        this.gameManager.plantManager
          .getComponent(PlantManager)
          .getPlantPrefabByName(this._parsePlantName(this._draggingCard.name))
      );

      if (plantNode) {
        this.gameManager.gridManager
          .getComponent(GridManager)
          .plantAt(gridPos.row, gridPos.col, plantNode);
      }
    }

    this._draggingCard.destroy();
    this._draggingCard = undefined;
  }
}
