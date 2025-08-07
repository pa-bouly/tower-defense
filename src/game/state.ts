import { characters } from './characters';
import { towers } from './towers';
import { projectiles } from './projectiles';

export let isBuildMode = false;
export let money = 100;
export let playerHealth = 100;
export const MAX_PLAYER_HEALTH = 100;
export let isGameOver = false;

export function toggleBuildMode() {
    isBuildMode = !isBuildMode;
}

export function addMoney(amount: number) {
    money += amount;
}

export function decreasePlayerHealth(amount: number) {
    playerHealth -= amount;
}

export function setGameOver(gameOver: boolean) {
    isGameOver = gameOver;
}

export function resetGame() {
    isBuildMode = false;
    money = 100;
    playerHealth = MAX_PLAYER_HEALTH;
    isGameOver = false;
    characters.length = 0; // Clear characters array
    towers.length = 0;     // Clear towers array
    projectiles.length = 0; // Clear projectiles array
}

export const path = [
  { x: 1, y: 1 },
  { x: 1, y: 3 },
  { x: 10, y: 3 },
  { x: 10, y: 6 },
  { x: 1, y: 6 },
  { x: 1, y: 9 },
  { x: 14, y: 9 },
];