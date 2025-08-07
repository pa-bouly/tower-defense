import { TILE_SIZE, TOWER_COST } from './constants';
import type { Tower } from './types';
import { money, addMoney, isBuildMode } from './state';
import { map } from './map';

export const towers: Tower[] = [
  { x: 2, y: 2, width: TILE_SIZE, height: TILE_SIZE, color: 'blue', range: 3 * TILE_SIZE, fireRate: 1000, lastShotTime: 0 },
];

export function addTower(x: number, y: number) {
    if (map[y][x] === 1) {
        console.log("Cannot build on the path");
        return false;
    }
    if (towers.some(tower => tower.x === x && tower.y === y)) {
        console.log("Tower already exists at this location");
        return false;
    }
    if (money < TOWER_COST) {
        console.log("Not enough money to build a tower");
        return false;
    }
    towers.push({ x, y, width: TILE_SIZE, height: TILE_SIZE, color: 'blue', range: 3 * TILE_SIZE, fireRate: 1000, lastShotTime: 0 });
    addMoney(-TOWER_COST);
    return true;
}

export function removeTower(x: number, y: number) {
    const index = towers.findIndex(tower => tower.x === x && tower.y === y);
    if (index > -1) {
        towers.splice(index, 1);
    }
}

export function drawTowers(context: CanvasRenderingContext2D) {
  for (const tower of towers) {
    context.fillStyle = tower.color;
    context.fillRect(tower.x * TILE_SIZE, tower.y * TILE_SIZE, tower.width, tower.height);

    if (isBuildMode) {
      context.beginPath();
      context.arc(
        tower.x * TILE_SIZE + TILE_SIZE / 2,
        tower.y * TILE_SIZE + TILE_SIZE / 2,
        tower.range,
        0,
        2 * Math.PI
      );
      context.strokeStyle = 'rgba(255, 255, 0, 0.5)';
      context.stroke();
    }
  }
}