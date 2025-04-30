import GameManager from "./GameManager";
import PlantCardManager from "./PlantCardManager";

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

  public setDraggingCard(card: cc.Node): void {
    this._draggingCard = card;
  }

  private _registerTouchEvents(): void {
    this.dragLayer.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.dragLayer.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.dragLayer.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
  }

  private _startDragging(originCard: cc.Node, touchPos: cc.Vec2): void {
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
      this.gameManager.plantCardManager.getComponent(
        PlantCardManager
      ).plantCardLayer;

    for (const card of plantCardLayer.children) {
      if (
        card.getComponent("PlantCard") &&
        card.getBoundingBoxToWorld().contains(touchPos)
      ) {
        this._startDragging(card, touchPos);
        break;
      }
    }
  }

  private _onTouchMove(event: cc.Event.EventTouch): void {
    if (!this._draggingCard) return;

    const touchPos = event.getLocation();
    const localPos = this.dragLayer.convertToNodeSpaceAR(touchPos);
    this._draggingCard.setPosition(localPos);
  }

  private _onTouchEnd(event: cc.Event.EventTouch): void {
    if (!this._draggingCard) return;

    this._draggingCard.destroy();
    this._draggingCard = undefined;
  }
}
