import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from './constants';
import { isBuildMode } from './state';

export const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export function drawMap(context: CanvasRenderingContext2D, grassImage: HTMLImageElement | null, pathImage: HTMLImageElement | null) {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (map[y][x] === 1) {
        // Path image
        if (pathImage) {
          context.drawImage(pathImage, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        } else {
          context.fillStyle = '#8B4513'; // Fallback color
          context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      } else {
        // Grass image
        if (grassImage) {
          context.drawImage(grassImage, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        } else {
          const gradient = context.createLinearGradient(x * TILE_SIZE, y * TILE_SIZE, x * TILE_SIZE, (y + 1) * TILE_SIZE);
          gradient.addColorStop(0, '#32CD32'); // LimeGreen
          gradient.addColorStop(1, '#228B22'); // ForestGreen
          context.fillStyle = gradient; // Fallback gradient
          context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
  if (isBuildMode) {
    context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    context.lineWidth = 1;
    for (let x = 0; x <= MAP_WIDTH; x++) {
        context.beginPath();
        context.moveTo(x * TILE_SIZE, 0);
        context.lineTo(x * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
        context.stroke();
    }
    for (let y = 0; y <= MAP_HEIGHT; y++) {
        context.beginPath();
        context.moveTo(0, y * TILE_SIZE);
        context.lineTo(MAP_WIDTH * TILE_SIZE, y * TILE_SIZE);
        context.stroke();
    }
  }
}