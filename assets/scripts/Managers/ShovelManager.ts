import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShovelManager {
  private _shovelLayer: cc.Node = undefined;
  private _gameManager: GameManager = undefined;

  private _isShovelMode: boolean = false;
  private _shovelIconClone: cc.Node = undefined;

  public init(shovelLayer: cc.Node, gameManager: GameManager): void {
    this._shovelLayer = shovelLayer;
    this._gameManager = gameManager;
    this._registerTouchEvents();
  }

  private _registerTouchEvents(): void {
    this._shovelLayer.on(
      cc.Node.EventType.MOUSE_MOVE,
      this._handleMouseMove,
      this
    );

    this._shovelLayer.on(
      cc.Node.EventType.TOUCH_END,
      this._handleTouchGameArea,
      this
    );
  }

  private _shovelMotion(): void {
    cc.tween(this._shovelIconClone)
      .to(0.2, { angle: -20 })
      .to(0.1, { angle: 0 })
      .start();
  }

  public toggleShovelMode(): void {
    if (this._isShovelMode) {
      this._exitShovelMode();
    } else {
      this._enterShovelMode();
    }
  }

  private _enterShovelMode(): void {
    this._isShovelMode = true;
    this._createShovelClone();
    this._gameManager.getUiManager().setShovelOpacity(128);
    this._gameManager.getDragManager().unregisterTouchEvents();
  }

  private _exitShovelMode(): void {
    this._isShovelMode = false;
    this._gameManager.getUiManager().setShovelOpacity(255);
    this._destroyShovelClone();
    this._gameManager.getDragManager().registerTouchEvents();
  }

  private _createShovelClone(): void {
    if (this._shovelIconClone) {
      return;
    }
    this._shovelIconClone = cc.instantiate(
      this._gameManager.getUiManager().getShovelIcon()
    );
    this._shovelLayer.addChild(this._shovelIconClone);
  }

  private _destroyShovelClone(): void {
    if (this._shovelIconClone) {
      this._shovelIconClone.destroy();
      this._shovelIconClone = undefined;
    }
  }

  private _handleMouseMove(event: cc.Event.EventMouse): void {
    if (!this._isShovelMode) return;

    const mousePos = event.getLocation();
    const localPos = this._shovelLayer.convertToNodeSpaceAR(mousePos);
    this._shovelIconClone.setPosition(localPos);
  }

  private _handleTouchGameArea(event: cc.Event.EventTouch): void {
    if (!this._isShovelMode) {
      return;
    }
    this._shovelMotion();
    const touchPos = event.getLocation();
    const localPos = this._shovelLayer.convertToNodeSpaceAR(touchPos);

    //find pos on grid
    const gridPos = this._gameManager
      .getGridManager()
      ._worldPosToGrid(localPos);

    //unplant
    gridPos &&
      !this._gameManager.getGridManager().canPlant(gridPos.row, gridPos.col) &&
      this._gameManager.getGridManager().removePlant(gridPos.row, gridPos.col);
  }
}
