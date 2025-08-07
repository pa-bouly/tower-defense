import { useRef, useEffect, useState } from 'react';
import { drawMap } from '../game/map';
import { drawTowers, addTower, removeTower } from '../game/towers';
import { drawCharacters, addCharacter, characters } from '../game/characters';
import { drawProjectiles } from '../game/projectiles';
import { updateGame } from '../game/gameLoop';
import { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE, TOWER_COST } from '../game/constants';
import { isBuildMode, toggleBuildMode, money } from '../game/state';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTimeRef = useRef<number>(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [buildMode, setBuildMode] = useState(isBuildMode);
  const [playerMoney, setPlayerMoney] = useState(money);
  const [characterImage, setCharacterImage] = useState<HTMLImageElement | null>(null);

  const handleAddCharacter = () => {
    addCharacter();
    setCharacterCount(characters.length);
  };

  const handleToggleBuildMode = () => {
    toggleBuildMode();
    setBuildMode(isBuildMode);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isBuildMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / TILE_SIZE);
      const y = Math.floor((event.clientY - rect.top) / TILE_SIZE);

      if (event.shiftKey) {
        removeTower(x, y);
      } else {
        const towerAdded = addTower(x, y);
        if (towerAdded) {
          setPlayerMoney(money);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Load character image
    const img = new Image();
    img.src = '/character.png'; // Assuming character.png is in the public folder
    img.onload = () => {
      setCharacterImage(img);
    };

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawMap(context);
      drawTowers(context);
      if (characterImage) {
        drawCharacters(context, characterImage);
      } else {
        drawCharacters(context, null); // Draw placeholder if image not loaded
      }
      drawProjectiles(context);
      updateGame(deltaTime);
      setCharacterCount(characters.length);
      setPlayerMoney(money);
      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

  }, [buildMode, characterImage]); // Re-run effect when buildMode or characterImage changes

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={MAP_WIDTH * TILE_SIZE}
        height={MAP_HEIGHT * TILE_SIZE}
        onClick={handleCanvasClick}
      />
      <div>
        <button onClick={handleAddCharacter}>Add Character</button>
        <p>Character Count: {characterCount}</p>
        <p>Money: {playerMoney}</p>
      </div>
      <div>
        <button onClick={handleToggleBuildMode}>
          {buildMode ? 'Exit Build Mode' : 'Enter Build Mode'}
        </button>
        {buildMode && <p>Click to add tower (Cost: {TOWER_COST}), Shift+Click to remove tower</p>}
      </div>
    </div>
  );
};

export default Game;