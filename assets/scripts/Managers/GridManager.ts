import GameManager from "./GameManager";
import { IManager } from "./IManager";

export default class GridManager implements IManager {
  private _gridData: (cc.Node | undefined)[][] = [];

  private _gridWidth: number = 0;
  private _gridHeight: number = 0;
  private _startX: number = 0;
  private _startY: number = 0;
  private _rows: number = 0;
  private _cols: number = 0;
  private _gameManager: GameManager = undefined;

  public init(
    gridWidth: number,
    gridHeight: number,
    startX: number,
    startY: number,
    rows: number,
    cols: number,
    gameManager: GameManager
  ): void {
    this._gridWidth = gridWidth;
    this._gridHeight = gridHeight;
    this._startX = startX;
    this._startY = startY;
    this._rows = rows;
    this._cols = cols;
    this._gameManager = gameManager;
    this._loadGridSystem();
  }

  private _loadGridSystem(): void {
    for (let r = 0; r < this._rows; r++) {
      this._gridData[r] = [];
      for (let c = 0; c < this._cols; c++) {
        this._gridData[r][c] = undefined;
      }
    }
  }

  public worldPosToGrid(pos: cc.Vec2): { row: number; col: number } | null {
    const col = Math.floor((pos.x - this._startX) / this._gridWidth);
    const row = Math.floor((this._startY - pos.y) / this._gridHeight);
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      return { row, col };
    }
    return null;
  }

  public gridToWorldPos(row: number, col: number): cc.Vec2 {
    const x = this._startX + col * this._gridWidth + this._gridWidth / 2;
    const y = this._startY - row * this._gridHeight - this._gridHeight / 2;
    return cc.v2(x, y);
  }

  public canPlant(row: number, col: number): boolean {
    return this._gridData[row][col] === undefined;
  }

  public plantOnGrid(row: number, col: number, plantNode: cc.Node) {
    if (this.canPlant(row, col)) {
      this._gridData[row][col] = plantNode;
    }
  }

  public unplantFromGrid(row: number, col: number) {
    if (this._gridData[row][col] !== undefined) {
      this._gridData[row][col].destroy();
      this._gridData[row][col] = undefined;
    }
  }

  public getRandomWorldPos(): cc.Vec2 {
    const totalWidth = this._cols * this._gridWidth;
    const totalHeight = this._rows * this._gridHeight;

    const minX = this._startX;
    const maxX = this._startX + totalWidth;

    const maxY = this._startY;
    const minY = this._startY - totalHeight;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return cc.v2(randomX, randomY);
  }
}
