import { isBuildMode, path, addMoney, playerHealth, isGameOver, MAX_PLAYER_HEALTH, decreasePlayerHealth, setGameOver } from './state';
import { characters } from './characters';
import { towers } from './towers';
import { projectiles } from './projectiles';
import { TILE_SIZE } from './constants';

export function updateGame(deltaTime: number) {
    if (isBuildMode || isGameOver) {
        return;
    }
    // Move characters
    for (let i = characters.length - 1; i >= 0; i--) {
        const character = characters[i];
        if (character.pathIndex >= path.length) {
            // Character reached the end of the path
            decreasePlayerHealth(10); // Reduce player health
            characters.splice(i, 1); // Remove character
            if (playerHealth <= 0) {
                setGameOver(true);
            }
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