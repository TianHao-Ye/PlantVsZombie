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
    const gridPos = this._gameManager
      .getGridManager()
      ._worldPosToGrid(localPos);

    if (
      gridPos &&
      this._gameManager.getGridManager().canPlant(gridPos.row, gridPos.col)
    ) {
      const plantName = this._parsePlantName(this._draggingCard.name);
      const plantPrefab = this._gameManager
        .getPlantManager()
        .getPlantPrefabByName(plantName);

      if (plantPrefab) {
        const plantNode = cc.instantiate(plantPrefab);
        this._gameManager
          .getGridManager()
          .plantAt(gridPos.row, gridPos.col, plantNode);
      }
    }
    this._draggingCard.destroy();
    this._draggingCard = null;
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

  private _parsePlantName(originalName: string): string {
    return originalName.replace("card_", "");
  }
}
