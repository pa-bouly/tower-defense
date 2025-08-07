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
  currentFrame: number;
  frameX: number;
  frameY: number;
  animationSpeed: number; // milliseconds per frame
  lastFrameTime: number;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
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