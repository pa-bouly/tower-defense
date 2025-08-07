export const TILE_SIZE = 50;
export const MAP_WIDTH = 16;
export const MAP_HEIGHT = 12;

export let isBuildMode = false;

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

export function toggleBuildMode() {
    isBuildMode = !isBuildMode;
}

export function drawMap(context: CanvasRenderingContext2D) {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      context.fillStyle = map[y][x] === 1 ? '#a9a9a9' : '#3cb371';
      context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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

export interface Tower {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  range: number;
  fireRate: number; // in milliseconds
  lastShotTime: number;
}

export const TOWER_COST = 50;

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
    money -= TOWER_COST;
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

export const path = [
  { x: 1, y: 1 },
  { x: 1, y: 3 },
  { x: 10, y: 3 },
  { x: 10, y: 6 },
  { x: 1, y: 6 },
  { x: 1, y: 9 },
  { x: 14, y: 9 },
];

export interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  pathIndex: number;
  health: number;
  maxHealth: number;
}

export let money = 100;

export function addMoney(amount: number) {
    money += amount;
}

export const characters: Character[] = [];

export function addCharacter() {
    const startPoint = path[0];
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
    });
}

export function drawCharacters(context: CanvasRenderingContext2D, characterImage: HTMLImageElement | null) {
  for (const character of characters) {
    if (characterImage) {
      context.drawImage(characterImage, character.x, character.y, character.width, character.height);
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

export interface Projectile {
    x: number;
    y: number;
    target: Character;
    speed: number;
    color: string;
    width: number;
    height: number;
}

export const projectiles: Projectile[] = [];

export function drawProjectiles(context: CanvasRenderingContext2D) {
    for (const projectile of projectiles) {
        context.fillStyle = projectile.color;
        context.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    }
}

export function updateGame(deltaTime: number) {
    if (isBuildMode) {
        return;
    }
    // Move characters
    for (const character of characters) {
        if (character.pathIndex >= path.length) {
            continue;
        }

        const target = path[character.pathIndex];
        const targetX = target.x * TILE_SIZE;
        const targetY = target.y * TILE_SIZE;

        const dx = targetX - character.x;
        const dy = targetY - character.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const movementAmount = character.speed * deltaTime;

        if (distance <= movementAmount) {
            character.x = targetX;
            character.y = targetY;
            character.pathIndex++;
        } else {
            character.x += (dx / distance) * movementAmount;
            character.y += (dy / distance) * movementAmount;
        }
    }

    // Towers shoot
    const now = Date.now();
    for (const tower of towers) {
        if (now - tower.lastShotTime > tower.fireRate) {
            for (const character of characters) {
                const dx = character.x - (tower.x * TILE_SIZE);
                const dy = character.y - (tower.y * TILE_SIZE);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < tower.range) {
                                            projectiles.push({
                        x: tower.x * TILE_SIZE + TILE_SIZE / 2,
                        y: tower.y * TILE_SIZE + TILE_SIZE / 2,
                        target: character,
                        speed: 0.5, // Adjusted speed
                        color: 'gold',
                        width: 10,
                        height: 10,
                    });
                    tower.lastShotTime = now;
                    break; // shoot one character at a time
                }
            }
        }
    }

    // Move projectiles and handle collisions
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        const target = projectile.target;
        const dx = target.x - projectile.x;
        const dy = target.y - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const collisionThreshold = TILE_SIZE / 4; // Define a collision radius

        if (distance < collisionThreshold) {
            projectiles.splice(i, 1);
            target.health -= 50; // Projectile damage
            if (target.health <= 0) {
                const charIndex = characters.indexOf(target);
                if (charIndex > -1) {
                    characters.splice(charIndex, 1);
                    addMoney(10); // Award money for defeating character
                }
            }
        } else {
            projectile.x += (dx / distance) * projectile.speed * deltaTime;
            projectile.y += (dy / distance) * projectile.speed * deltaTime;
        }
    }
}
