const {ccclass, property} = cc._decorator;

@ccclass
export default class Sun extends cc.Component {

    @property
    public lifeTime: number = 5;

    private _isCollected: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
