import NormalZombie from "../Characters/Zombie/NormalZombie";
import GameManager from "./GameManager";
import { IManager } from "./IManager";

const { ccclass, property } = cc._decorator;

export enum ZombieState {
  Idle,
  Walking,
  Attacking,
  Dead,
}

@ccclass
export default class ZoobieManager implements IManager {
  private _zombieLayer: cc.Node = undefined;
  private _zombiePrefabs: cc.Prefab[] = undefined;
  private _gameManager: GameManager = undefined;
  private _zombiePrefabMap: { [key: string]: cc.Prefab } = {};
  private _activeZombies: Set<cc.Node> = undefined;

  public init(
    zombieLayer: cc.Node,
    zombiePrefabs: cc.Prefab[],
    gameManager: GameManager
  ): void {
    this._zombieLayer = zombieLayer;
    this._zombiePrefabs = zombiePrefabs;
    this._gameManager = gameManager;

    for (const prefab of this._zombiePrefabs) {
      const name = prefab.name;
      this._zombiePrefabMap[name] = prefab;
    }

    this._startSpawningZombie();
    this._activeZombies = new Set();
  }

  public update(dt: number): void {
    this._activeZombies.forEach((zombie) => {
      if (!cc.isValid(zombie)) {
        this._activeZombies.delete(zombie);
        return;
      }
      this._checkAttack(zombie);
    });
  }

  private _checkAttack(zombie: cc.Node) {
    const zombiePos = zombie.getPosition();
    const gridPos = this._gameManager
      .getGridManager()
      .worldPosToGrid(zombiePos);
    if (!gridPos) {
      return;
    }

    const plantNode = this._gameManager
      .getGridManager()
      .getNodeOnGrid(gridPos.row, gridPos.col);
    if (!plantNode) {
      return;
    }
    // this._activeZombies.delete(zombie);
    // zombie.destroy();
    zombie.getComponent(NormalZombie).playAttackMotion();
  }

  public getZombiePrefabByName(name: string): cc.Prefab | null {
    return this._zombiePrefabMap[name] || null;
  }

  private _createSingleZombieNode(zombieName: string): cc.Node {
    const zombiePrefab = this.getZombiePrefabByName(zombieName);
    if (zombiePrefab) {
      const newZombie = cc.instantiate(zombiePrefab);
      this._activeZombies.add(newZombie);
      return newZombie;
    }
    return null;
  }

  private _getRandomZombiePosY(): number {
    const yOffset = 30;
    return this._gameManager.getGridManager().getRandomWorldPosY() + yOffset;
  }

  private _createRandomZombie(): void {
    let newZombie: cc.Node = this._createSingleZombieNode("normal_zombie");
    const startY = this._getRandomZombiePosY();
    const startX = cc.winSize.width / 2 - 100;
    this._zombieLayer.addChild(newZombie);
    newZombie.setPosition(cc.v2(startX, startY));
  }

  private _startSpawningZombie(interval: number = 10): void {
    this._gameManager
      .getGameScheduler()
      .scheduleSpawningZombie(this._createRandomZombie.bind(this), interval);
  }
}
