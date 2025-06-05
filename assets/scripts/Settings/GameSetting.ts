// GameSettings.ts
export namespace GameSettings {
  //   // 游戏难度相关
  //   export const DEFAULT_SPAWN_INTERVAL = 10; // 秒
  //   export const MAX_ZOMBIES = 30;

  //   // 地图/网格设置
  //   export const GRID_ROWS = 5;
  //   export const GRID_COLS = 9;
  //   export const GRID_CELL_WIDTH = 80;
  //   export const GRID_CELL_HEIGHT = 100;

  //   // 植物初始配置
  //   export const INITIAL_SUN = 50;
  //   export const SUN_PRODUCE_INTERVAL = 7;

  //   // 僵尸配置
  //   export const ZOMBIE_SPEED = 30;
  //   export const ZOMBIE_DAMAGE = 10;

  //   // 是否开启调试日志
  //   export const DEBUG_MODE = true;
  export function getZombieSpawnX(): number {
    return cc.winSize.width / 2 - 100;
  }

  export function getZombieEndX(): number {
    return (-1 * cc.winSize.width) / 2 + 100;
  }

  export function getBulletEndX(): number {
    return cc.winSize.width / 2 - 50;
  }

  export const UNIT_SUN_VALUE = 25;
  export const SUN_LIFE_TIME = 5;
  export const ZOMBIE_WALK_SPEED = 1;
}
