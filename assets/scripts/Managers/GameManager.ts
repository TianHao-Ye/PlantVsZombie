import DragManager from "./DragManager";
import GridManager from "./GridManager";
import PlantCardManager from "./PlantCardManager";
import PlantManager from "./PlantManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  plantManager: cc.Node = undefined;

  @property(cc.Node)
  gridManager: cc.Node = undefined;

  @property(cc.Node)
  plantCardManager: cc.Node = undefined;

  @property(cc.Node)
  dragManager: cc.Node = undefined;

  @property(cc.Node)
  background: cc.Node = undefined;

  @property(cc.Node)
  uiNode: cc.Node = undefined;

  private _isStart: boolean = false;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    // this.loadGame();
    this.getScriptPlantCardManager().loadPlantCards();
  }

  protected start(): void {}

  // update (dt) {}

  public loadGame(): void {
    this._isStart = true;
    // const playButton = this.uiNode.getChildByName("PlayButton");
    // playButton.active = false;
    this.getScriptPlantCardManager().loadPlantCards();
  }

  public getScriptPlantCardManager(): PlantCardManager {
    return this.plantCardManager.getComponent(PlantCardManager);
  }

  public getScriptGridManager(): GridManager {
    return this.gridManager.getComponent(GridManager);
  }

  public getScriptPlantManager(): PlantManager {
    return this.plantManager.getComponent(PlantManager);
  }

  public getScriptDragManager(): DragManager {
    return this.dragManager.getComponent(DragManager);
  }
}
