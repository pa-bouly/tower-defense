# Tower Defense Game

This is a simple Tower Defense game built with React, TypeScript, and Vite.

## Features

*   **Basic Tower Defense Gameplay:** Defend your base from incoming characters.
*   **Character Spawning & Movement:** Characters follow a predefined path across the map.
*   **Tower Shooting:** Towers automatically target and shoot at characters within their range.
*   **Character Health System:** Characters have health bars and take damage from tower projectiles.
*   **Money System:** Earn money by defeating characters.
*   **Build Mode:**
    *   Toggle build mode to construct or dismantle towers.
    *   Visualize tower range when in build mode.
*   **Tower Placement & Removal:** Add new towers using your money, or remove existing ones.
*   **Character Sprites:** Characters are rendered using a sprite image (requires `public/character.png`).

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd tower-defense
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Place Character Sprite:**
    *   Create an image file named `character.png` (e.g., a simple square or a basic character design).
    *   Place this file in the `public/` directory of the project.
4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The game will open in your browser, usually at `http://localhost:5173/`.

## How to Play

*   **Add Character:** Click the "Add Character" button to spawn a new character at the start of the path.
*   **Money:** You earn money by defeating characters. Your current money is displayed on the screen.
*   **Build Mode:**
    *   Click the "Enter Build Mode" button to activate build mode.
    *   In build mode, a grid will appear on the map, and existing towers will show their range.
    *   **Add Tower:** Click on an empty, non-path tile to place a new tower. Each tower costs money.
    *   **Remove Tower:** Hold down the `Shift` key and click on an existing tower to remove it.
    *   Click "Exit Build Mode" to resume normal gameplay (characters will move and towers will shoot).
*   **Character Health:** Observe the health bars above characters. When their health reaches zero, they are defeated.
*   **Towers:** Towers automatically shoot at characters within their range.

## Future Improvements

*   Different tower types with varying stats (damage, range, fire rate).
*   Upgrading towers.
*   Multiple waves of characters.
*   Pathfinding for characters (more complex paths).
*   User interface improvements and visual effects.
*   Sound effects and background music.
*   Game over conditions.