import Plant from "../Characters/Plant/Plant";
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

const ZoombieScriptMap: { [key: string]: string } = {
  normal_zombie: "NormalZombie",
};

@ccclass
export default class ZoobieManager implements IManager {
  private _zombieLayer: cc.Node = undefined;
  private _zombiePrefabs: cc.Prefab[] = undefined;
  private _gameManager: GameManager = undefined;
  private _zombiePrefabMap: { [key: string]: cc.Prefab } = {};

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
  }

  public update(dt: number): void {
    const activeZombies = this._zombieLayer.children;
    activeZombies.forEach((zombieNode) => {
      const zoombieScriptName = ZoombieScriptMap[zombieNode.name];
      const zoombieScript = zombieNode.getComponent(zoombieScriptName);

      const isZombieLive = zoombieScript.checkNaturalDeath();
      isZombieLive && this._checkAttack(zombieNode);
    });
  }

  private _checkAttack(zombieNode: cc.Node) {
    const gridManager = this._gameManager.getGridManager();
    const plantManager = this._gameManager.getPlantManager();
    const zoombieScriptName = ZoombieScriptMap[zombieNode.name];
    const zoombieScript = zombieNode.getComponent(zoombieScriptName);

    const zombiePos = zombieNode.getPosition();
    //check zombie on grid
    const zombieOnGridPos = gridManager.worldPosToGrid(zombiePos);
    if (!zombieOnGridPos) {
      return;
    }
    //check plant on grid
    const plantNode = gridManager.getNodeOnGrid(
      zombieOnGridPos.row,
      zombieOnGridPos.col
    );

    if (!plantNode) {
      zoombieScript._playWalkingMotion();
      return;
    } else {
      const zoombieDamage = zoombieScript.getDamage();
      zoombieScript.playAttackMotion();
      plantManager.handleAttack(plantNode, zombieOnGridPos, zoombieDamage);
    }
  }

  public getZombiePrefabByName(name: string): cc.Prefab | null {
    return this._zombiePrefabMap[name] || null;
  }

  private _createSingleZombieNode(zombieName: string): cc.Node {
    const zombiePrefab = this.getZombiePrefabByName(zombieName);
    if (zombiePrefab) {
      const newZombie = cc.instantiate(zombiePrefab);
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
