// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlantCardManager extends cc.Component {


    @property([cc.Prefab])
    plantCardPrefabs: cc.Prefab[] = [];

    private _plantCardPrefabMap: { [key: string]: cc.Prefab } = {};

    // LIFE-CYCLE CALLBACKS:

    protected onLoad(): void {
        for (const prefab of this.plantCardPrefabs) {
            const name = prefab.name;
            this._plantCardPrefabMap[name] = prefab;
        }
    }

    protected start (): void {

    }

    // update (dt) {}

    public getPlantPrefabByName(name: string): cc.Prefab | null {
        return this._plantCardPrefabMap[name] || null;
    }
}
