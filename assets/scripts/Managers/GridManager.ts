import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GridManager extends cc.Component {

    @property
    gridWidth: number = 165.7;

    @property
    gridHeight: number = 144.17;

    @property
    startX: number = -700;

    @property
    startY: number = 400;

    @property
    rows: number = 6;

    @property
    cols: number = 7;

    private _gridData: (cc.Node | undefined)[][] = [];
 
    // LIFE-CYCLE CALLBACKS:

    protected onLoad (): void {
        for (let r = 0; r < this.rows; r++) {
            this._gridData[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this._gridData[r][c] = undefined;
            }
        }
    }

    protected start () : void {

    }

    // update (dt) {}

    public _worldPosToGrid(pos: cc.Vec2): { row: number, col: number } | null {
        const col = Math.floor((pos.x - this.startX) / this.gridWidth);
        const row = Math.floor((this.startY - pos.y) / this.gridHeight);
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return { row, col };
        }
        return null;
    }

    public _gridToWorldPos(row: number, col: number): cc.Vec2 {
        const x = this.startX + col * this.gridWidth + this.gridWidth / 2;
        const y = this.startY - row * this.gridHeight - this.gridHeight / 2;
        return cc.v2(x, y);
    }

    public _canPlant(row: number, col: number): boolean {
        return this._gridData[row][col] === undefined;
    }

    public plantAt(row: number, col: number, plantNode: cc.Node) {
        if (this._canPlant(row, col)) {
            this._gridData[row][col] = plantNode;
            plantNode.setPosition(this._gridToWorldPos(row, col));
            plantNode.parent = this.node.parent.getComponent(GameManager).plantManager;
        }
    }

    public removePlant(row: number, col: number) {
        if (this._gridData[row][col] !== null) {
            this._gridData[row][col] = null;
        }
    }
}
