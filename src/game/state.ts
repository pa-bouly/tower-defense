export let isBuildMode = false;
export let money = 100;

export function toggleBuildMode() {
    isBuildMode = !isBuildMode;
}

export function addMoney(amount: number) {
    money += amount;
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