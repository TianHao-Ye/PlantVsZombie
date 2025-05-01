import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShovelManager extends cc.Component {
  @property(cc.Node)
  shovelIcon: cc.Node = undefined;

  @property(GameManager)
  gameManager: GameManager = undefined;

  @property(cc.Node)
  shovelLayer: cc.Node = undefined;

  private _isShovelMode: boolean = false;
  private _shovelIconClone: cc.Node = undefined;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this._registerTouchEvents();
  }

  start() {}

  protected update(): void {}

  private _registerTouchEvents(): void {
    this.shovelIcon.on(
      cc.Node.EventType.TOUCH_END,
      this._handleTouchIcon,
      this
    );
    this.shovelLayer.on(
      cc.Node.EventType.MOUSE_MOVE,
      this._handleMouseMove,
      this
    );

    this.shovelLayer.on(
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
    this.shovelIcon.opacity = 128;
    this.gameManager.getScriptDragManager().unregisterTouchEvents();
  }

  private _exitShovelMode(): void {
    this._isShovelMode = false;
    this.shovelIcon.opacity = 255;
    this._destroyShovelClone();
    this.gameManager.getScriptDragManager().registerTouchEvents();
  }

  private _createShovelClone(): void {
    if (this._shovelIconClone) return;
    this._shovelIconClone = cc.instantiate(this.shovelIcon);
    this.shovelLayer.addChild(this._shovelIconClone);
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
    const localPos = this.shovelLayer.convertToNodeSpaceAR(mousePos);
    this._shovelIconClone.setPosition(localPos);
  }

  private _handleTouchGameArea(event: cc.Event.EventTouch): void {
    if (!this._isShovelMode) {
      return;
    }

    const touchPos = event.getLocation();
    const localPos = this.shovelLayer.convertToNodeSpaceAR(touchPos);

    const gridPos = this.gameManager
      .getScriptGridManager()
      ._worldPosToGrid(localPos);

    //unplant
    if (
      gridPos &&
      !this.gameManager
        .getScriptGridManager()
        .canPlant(gridPos.row, gridPos.col)
    ) {
      this.gameManager
        .getScriptGridManager()
        .removePlant(gridPos.row, gridPos.col);
      this._exitShovelMode();
      this.gameManager.getScriptDragManager().registerTouchEvents();
    }
  }
}
