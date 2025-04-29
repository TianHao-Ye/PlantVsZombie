const {ccclass, property} = cc._decorator;

@ccclass
export default class PlantManager extends cc.Component {

    @property(cc.Node)
    plantLayer: cc.Node = undefined;

    @property(cc.Prefab)
    peashooterPrefab: cc.Prefab = undefined;

    @property([cc.Prefab])
    plantPrefabs: cc.Prefab[] = [];


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    // plantSeed(plantType: string, position: cc.Vec2) {
    //     const prefab = this.getPrefabByType(plantType);
    //     if (!prefab) return;
    //     const plant = cc.instantiate(prefab);
    //     plant.parent = this.plantLayer;
    //     plant.setPosition(position);
    // }
    
}
