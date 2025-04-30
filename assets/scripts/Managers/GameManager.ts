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

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    // this.background.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    this.plantCardManager.getComponent(PlantCardManager).loadPlantCards();
    console.log("i am initialized");
  }

  protected start(): void {}

  // update (dt) {}

  // onTouch(event: cc.Event.EventTouch) {
  //   const touchPos = event.getLocation();
  //   const localPos = this.background.convertToNodeSpaceAR(touchPos);

  //   const gridPos = this.gridManager
  //     .getComponent(GridManager)
  //     ._worldPosToGrid(localPos);

  //   if (gridPos) {
  //     const plantNode = cc.instantiate(
  //       this.plantManager
  //         .getComponent(PlantManager)
  //         .getPlantPrefabByName("pea_shooter")
  //     );

  //     if (plantNode) {
  //       this.gridManager
  //         .getComponent(GridManager)
  //         .plantAt(gridPos.row, gridPos.col, plantNode);
  //     }
  //   }
  // }
}
