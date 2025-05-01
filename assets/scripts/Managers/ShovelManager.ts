import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShovelManager {
  private _shovelIcon: cc.Node = null;
  private _shovelLayer: cc.Node = null;
  private _gameManager: GameManager = null;

  private _isShovelMode: boolean = false;
  private _shovelIconClone: cc.Node = undefined;

  public init(
    shovelIcon: cc.Node,
    shovelLayer: cc.Node,
    gameManager: GameManager
  ): void {
    this._shovelIcon = shovelIcon;
    this._shovelLayer = shovelLayer;
    this._gameManager = gameManager;

    this._registerTouchEvents();
  }

  private _registerTouchEvents(): void {
    this._shovelIcon.on(
      cc.Node.EventType.TOUCH_END,
      this._handleTouchIcon,
      this
    );
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

  private _handleTouchIcon(): void {
    this._toggleShovelMode();
  }

  private _toggleShovelMode(): void {
    if (this._isShovelMode) {
      this._exitShovelMode();
    } else {
      this._enterShovelMode();
    }
  }

  private _enterShovelMode(): void {
    this._isShovelMode = true;
    this._createShovelClone();
    this._shovelIcon.opacity = 128;
    this._gameManager.getDragManager().unregisterTouchEvents();
  }

  private _exitShovelMode(): void {
    this._isShovelMode = false;
    this._shovelIcon.opacity = 255;
    this._destroyShovelClone();
    this._gameManager.getDragManager().registerTouchEvents();
  }

  private _createShovelClone(): void {
    if (this._shovelIconClone) return;
    this._shovelIconClone = cc.instantiate(this._shovelIcon);
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

  private;

  private _handleTouchGameArea(event: cc.Event.EventTouch): void {
    if (!this._isShovelMode) {
      return;
    }

    const touchPos = event.getLocation();
    const localPos = this._shovelLayer.convertToNodeSpaceAR(touchPos);
    const gridPos = this._gameManager
      .getGridManager()
      ._worldPosToGrid(localPos);

    //unplant
    if (
      gridPos &&
      !this._gameManager.getGridManager().canPlant(gridPos.row, gridPos.col)
    ) {
      this._gameManager.getGridManager().removePlant(gridPos.row, gridPos.col);
      this._exitShovelMode();
      this._gameManager.getDragManager().registerTouchEvents();
    }
  }
}
