import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchEventLayer {
  private _gameManager: GameManager;
  private _touchEventLayer: cc.Node;
  private _activeTouchHandler: string = undefined;

  public init(touchEventLayer: cc.Node, gameManager: GameManager): void {
    this._gameManager = gameManager;
    this._touchEventLayer = touchEventLayer;

    this._touchEventLayer.on(
      cc.Node.EventType.TOUCH_START,
      this._onTouchStart,
      this
    );
    this._touchEventLayer.on(
      cc.Node.EventType.MOUSE_MOVE,
      this._onTouchMove,
      this
    );
    this._touchEventLayer.on(
      cc.Node.EventType.TOUCH_END,
      this._onTouchEnd,
      this
    );
  }

  private _onTouchStart(event: cc.Event.EventTouch): void {
    const touchPos = event.getLocation();

    if (this._activeTouchHandler !== "shovel") {
      // 1. sun collect
      if (this._gameManager.getSunManager().onGlobalTouchStart(touchPos)) {
        this._activeTouchHandler = "sun";
        return;
      }

      // 2. drag card
      if (this._gameManager.getDragManager().onGlobalTouchStart(touchPos)) {
        this._activeTouchHandler = "drag";
        return;
      }
    }

    const clickOnShovel = this._gameManager
      .getUiManager()
      .onGlobalTouchStart(touchPos);

    if (clickOnShovel) {
      if (this._activeTouchHandler === "shovel") {
        this._activeTouchHandler = undefined;
      } else {
        this._activeTouchHandler = "shovel";
      }
    } else if (this._activeTouchHandler === "shovel") {
      this._gameManager.getShovelManager().onGlobalTouchEnd(touchPos);
    }
  }

  private _onTouchMove(event: cc.Event.EventTouch): void {
    const touchPos = event.getLocation();
    switch (this._activeTouchHandler) {
      case "drag":
        this._gameManager.getDragManager().onGlobalTouchMove(touchPos);
        break;
      case "shovel":
        console.log(this._activeTouchHandler);
        this._gameManager.getShovelManager().onGlobalTouchMove(touchPos);
        break;
    }
  }

  private _onTouchEnd(event: cc.Event.EventTouch): void {
    const touchPos = event.getLocation();

    switch (this._activeTouchHandler) {
      case "drag":
        this._gameManager.getDragManager().onGlobalTouchEnd(touchPos);
        this._activeTouchHandler = undefined;
        break;
    }
  }
}
