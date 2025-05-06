import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShovelManager implements IManager {
  private _shovelLayer: cc.Node = undefined;
  private _gameManager: GameManager = undefined;

  private _isShovelMode: boolean = false;
  private _shovelIconClone: cc.Node = undefined;

  public init(shovelLayer: cc.Node, gameManager: GameManager): void {
    this._shovelLayer = shovelLayer;
    this._gameManager = gameManager;
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

  public isInShovelMode(): boolean {
    return this._isShovelMode;
  }

  private _enterShovelMode(): void {
    this._isShovelMode = true;
    this._createShovelClone();
    this._gameManager.getUiManager().setShovelOpacity(128);
  }

  private _exitShovelMode(): void {
    this._isShovelMode = false;
    this._gameManager.getUiManager().setShovelOpacity(255);
    this._destroyShovelClone();
  }

  private _createShovelClone(): void {
    if (this._shovelIconClone) {
      return;
    }
    this._shovelIconClone = cc.instantiate(
      this._gameManager.getUiManager().getShovelButton()
    );
    this._shovelLayer.addChild(this._shovelIconClone);
  }

  private _destroyShovelClone(): void {
    if (this._shovelIconClone) {
      this._shovelIconClone.destroy();
      this._shovelIconClone = undefined;
    }
  }

  public onGlobalTouchMove(touhPos: cc.Vec2): void {
    if (!this._isShovelMode) {
      return;
    }

    const localPos = this._shovelLayer.convertToNodeSpaceAR(touhPos);
    this._shovelIconClone.setPosition(localPos);
  }

  public onGlobalTouchEnd(touhPos: cc.Vec2): void {
    if (!this._isShovelMode) {
      return;
    }
    this._shovelMotion();
    const localPos = this._shovelLayer.convertToNodeSpaceAR(touhPos);
    const gridPos = this._gameManager.getGridManager().worldPosToGrid(localPos);

    if (
      gridPos &&
      !this._gameManager.getGridManager().canPlant(gridPos.row, gridPos.col)
    ) {
      this._gameManager
        .getGridManager()
        .unplantFromGrid(gridPos.row, gridPos.col);
    }
  }
}
