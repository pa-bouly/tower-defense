import { TILE_SIZE } from './constants';
import type { Character } from './types';
import { path } from './state';

export const characters: Character[] = [];

export function addCharacter(enemySpritesheet: HTMLImageElement | null) {
    const startPoint = path[0];
    let frameWidth = TILE_SIZE;
    let frameHeight = TILE_SIZE;
    let totalFrames = 1;

    if (enemySpritesheet) {
        frameHeight = enemySpritesheet.height; // Assuming single row spritesheet
        totalFrames = enemySpritesheet.width / frameHeight; // Assuming frames are square and TILE_SIZE
        frameWidth = frameHeight; // Each frame is square, same as height
    }

    characters.push({
        x: startPoint.x * TILE_SIZE,
        y: startPoint.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        color: 'red',
        speed: 0.1, // Adjusted speed to be in pixels per millisecond
        pathIndex: 1,
        health: 100,
        maxHealth: 100,
        currentFrame: 0,
        frameX: 0,
        frameY: 0,
        animationSpeed: 100, // milliseconds per frame
        lastFrameTime: 0,
        frameWidth: frameWidth,
        frameHeight: frameHeight,
        totalFrames: totalFrames,
    });
}

export function drawCharacters(context: CanvasRenderingContext2D, enemySpritesheet: HTMLImageElement | null) {
  for (const character of characters) {
    if (enemySpritesheet) {
      const sx = character.currentFrame * character.frameWidth;
      const sy = 0; // Assuming single row spritesheet

      context.drawImage(
        enemySpritesheet, // Image source
        sx, sy, // Source x, y
        character.frameWidth, character.frameHeight, // Source width, height
        character.x, character.y, // Destination x, y
        character.width, character.height // Destination width, height
      );
    } else {
      // Fallback to drawing shapes if image not loaded
      // Draw body
      context.fillStyle = character.color;
      context.fillRect(character.x + TILE_SIZE / 4, character.y + TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2);

      // Draw head
      context.beginPath();
      context.arc(character.x + TILE_SIZE / 2, character.y + TILE_SIZE / 2, TILE_SIZE / 4, 0, Math.PI * 2);
      context.fillStyle = character.color;
      context.fill();
    }

    // Draw health bar
    const healthBarWidth = character.width;
    const healthBarHeight = 5;
    const healthBarX = character.x;
    const healthBarY = character.y - healthBarHeight - 2; // Above the character

    // Background of health bar
    context.fillStyle = '#555';
    context.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    // Current health
    context.fillStyle = '#0f0';
    const currentHealthWidth = (character.health / character.maxHealth) * healthBarWidth;
    context.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);

    // Border of health bar
    context.strokeStyle = '#000';
    context.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  }
}

export function updateCharacterAnimation(deltaTime: number) {
    const now = Date.now();
    for (const character of characters) {
        if (now - character.lastFrameTime > character.animationSpeed) {
            character.currentFrame = (character.currentFrame + 1) % character.totalFrames;
            character.lastFrameTime = now;
        }
    }
}