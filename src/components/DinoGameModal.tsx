import React, { useEffect, useState, useRef, useCallback } from 'react';

interface DinoGameModalProps {
  onClose: () => void;
}

interface Obstacle {
  id: number;
  x: number;
  width: number;
  height: number;
}

const DinoGameModal: React.FC<DinoGameModalProps> = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(0); // 0 = ground, 1 = jumping, 2 = ducking
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastObstacleTime = useRef<number>(0);
  const gameSpeed = useRef<number>(1);

  // Define game functions
  const jump = useCallback(() => {
    if (dinoY === 0) {
      setDinoY(1);
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
      jumpTimeoutRef.current = setTimeout(() => {
        setDinoY(0);
      }, 300);
    }
  }, [dinoY]);

  const duck = useCallback(() => {
    setDinoY(2);
    setTimeout(() => {
      setDinoY(0);
    }, 300);
  }, []);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setDinoY(0);
    setObstacles([]);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Global keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Handle game controls globally
      if (e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          jump();
        } else if (!gameStarted && !gameOver) {
          setGameStarted(true);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          duck();
        }
      } else if (e.key === 'Enter') {
        if (!gameStarted) {
          setGameStarted(true);
        } else if (gameOver) {
          resetGame();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, [onClose, gameStarted, gameOver, jump, duck, resetGame]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Simple game loop
      const gameLoop = () => {
        setObstacles(prev => {
          const newObstacles = prev.map(obstacle => ({
            ...obstacle,
            x: obstacle.x - 3, // Speed
          })).filter(obstacle => obstacle.x > -obstacle.width);

          // Check collision - only if dino is on the ground (not jumping)
          const dinoX = 48;
          const dinoWidth = 30;
          const dinoIsJumping = dinoY === 1;

          for (const obstacle of newObstacles) {
            // Check if obstacle is at same x position as dino
            const isAtSameX = obstacle.x <= dinoX + dinoWidth && obstacle.x + obstacle.width >= dinoX;
            
            // Only collide if dino is on the ground (not jumping)
            if (isAtSameX && !dinoIsJumping) {
              setGameOver(true);
              return newObstacles;
            }
          }

          return newObstacles;
        });

        setScore(prev => prev + 1);

        // Add new obstacles periodically (less frequent)
        if (Math.random() < 0.008) { // Reduced from 0.02 to 0.008
          setObstacles(prev => {
            // Only add new obstacle if there's no obstacle too close
            const tooClose = prev.some(obs => Math.abs(obs.x - 600) < 100);
            if (!tooClose) {
              return [
                ...prev,
                {
                  id: Date.now(),
                  x: 600,
                  width: 20,
                  height: 200,
                },
              ];
            }
            return prev;
          });
        }

        animationFrameRef.current = requestAnimationFrame(gameLoop);
      };

      animationFrameRef.current = requestAnimationFrame(gameLoop);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [gameStarted, gameOver, dinoY]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        className="w-full max-w-3xl mx-4 bg-[#ece9d8] text-black rounded-md shadow-md border border-gray-400 overflow-hidden animate-modalAppear"
        onClick={(e) => e.stopPropagation()}
        ref={gameRef}
      >
        {/* Windows XP-style title bar */}
        <div className="bg-gradient-to-b from-[#245edb] to-[#1a4aa5] text-white font-bold px-4 py-2 flex items-center justify-between">
          <span className="text-sm flex items-center gap-2">
            <span className="text-xl">🦖</span>
            Jessica's Dino Adventure
          </span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Game Area */}
        <div className="p-6 bg-[#ece9d8]">
          <div 
            className="relative bg-white border-2 border-gray-400 h-64 mb-4 overflow-hidden"
            style={{ position: 'relative', height: '300px', background: 'linear-gradient(to bottom, #87CEEB 0%, #E0E0E0 60%, #8B6914 60%)' }}
          >
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-2 bg-gray-700"></div>

            {/* Dinosaur */}
            <div
              className="absolute left-12 bottom-0 text-4xl transition-transform duration-300"
              style={{
                bottom: dinoY === 1 ? '80px' : dinoY === 2 ? '0px' : '10px',
                transition: 'bottom 0.3s ease-in-out',
              }}
            >
              🦖
            </div>

            {/* Obstacles */}
            {obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                className="absolute bottom-0 h-16 w-5 bg-gray-700 rounded-t-lg"
                style={{
                  left: `${obstacle.x}px`,
                  bottom: '0px',
                }}
              >
                <div className="absolute bottom-0 w-full h-8 bg-red-600 rounded-t"></div>
              </div>
            ))}

            {/* Instructions Overlay */}
            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-[#ece9d8] border-2 border-gray-400 p-6 text-center max-w-md">
                  <h3 className="text-xl font-bold mb-4 text-black">Ready to Play? 🎮</h3>
                  <p className="mb-2 text-sm text-gray-700">Press <kbd className="bg-gray-300 border border-gray-400 px-2 py-1">Space</kbd> or <kbd className="bg-gray-300 border border-gray-400 px-2 py-1">↑</kbd> to jump</p>
                  <p className="mb-4 text-sm text-gray-700">Press <kbd className="bg-gray-300 border border-gray-400 px-2 py-1">↓</kbd> to duck</p>
                  <button
                    onClick={() => setGameStarted(true)}
                    className="bg-[#7ea9e3] hover:bg-[#6b9bdb] border border-[#5b8cc4] text-white font-bold py-2 px-6 transition-colors shadow-sm"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-[#ece9d8] border-2 border-gray-400 p-6 text-center max-w-md">
                  <h3 className="text-2xl font-bold mb-4 text-red-600">Game Over! 💀</h3>
                  <p className="text-lg mb-4 text-black">Score: {score}</p>
                  <p className="mb-4 text-sm text-gray-700">Press <kbd className="bg-gray-300 border border-gray-400 px-2 py-1">Enter</kbd> or click to restart</p>
                  <button
                    onClick={resetGame}
                    className="bg-[#7ea9e3] hover:bg-[#6b9bdb] border border-[#5b8cc4] text-white font-bold py-2 px-6 transition-colors shadow-sm"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={jump}
              className="bg-[#ecead5] hover:bg-[#d4cfb7] border border-[#aca899] text-black font-medium py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled={gameOver || !gameStarted}
            >
              Jump ⬆️
            </button>
            <button
              onClick={duck}
              className="bg-[#ecead5] hover:bg-[#d4cfb7] border border-[#aca899] text-black font-medium py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled={gameOver || !gameStarted}
            >
              Duck ⬇️
            </button>
            {!gameStarted && (
              <button
                onClick={() => setGameStarted(true)}
                className="bg-[#7ea9e3] hover:bg-[#6b9bdb] border border-[#5b8cc4] text-white font-bold py-2 px-4 transition-colors shadow-sm"
              >
                Start ▶️
              </button>
            )}
          </div>

          {/* Score Display */}
          <div className="text-center">
            <p className="text-base font-bold text-black">
              Score: {score.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {!gameStarted && !gameOver && 'Press any key to start'}
              {gameOver && 'Game over! Click "Play Again" to restart'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoGameModal;

