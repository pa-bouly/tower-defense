import type { Projectile, Character } from './types';

export const projectiles: Projectile[] = [];

export function drawProjectiles(context: CanvasRenderingContext2D) {
    for (const projectile of projectiles) {
        context.fillStyle = projectile.color;
        context.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    }
}