import { useEffect, useRef, useState } from 'react';

/* Imagens */
import clouds from './assets/images/clouds.png';
import mario from './assets/images/mario.gif';
import gameover from './assets/images/gameover.png';
import pipe from './assets/images/pipe.png';

/* Áudios */
import jumpSoundFile from './assets/audio/jump.mp3';
import gameoverSoundFile from './assets/audio/gameover.mp3';
import mariomusicFile from './assets/audio/mariomusic.mp3';

export default function GameBoard() {
  const marioRef = useRef(null);
  const pipeRef = useRef(null);
  const jumpSoundRef = useRef(null);
  const gameoverSoundRef = useRef(null);
  const backgroundMusicRef = useRef(null);

  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const gameOverRef = useRef(false);

  useEffect(() => {
    gameOverRef.current = isGameOver;
  }, [isGameOver]);

  const jump = () => {
    if (jumpSoundRef.current) {
      jumpSoundRef.current.currentTime = 0;
      jumpSoundRef.current.play();
    }

    if (backgroundMusicRef.current && backgroundMusicRef.current.paused) {
      backgroundMusicRef.current.play().catch(() => {
        console.log('Autoplay bloqueado. Música será ativada após interação.');
      });
    }

    if (marioRef.current) {
      marioRef.current.classList.add('jump');
      setTimeout(() => marioRef.current.classList.remove('jump'), 550);
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!gameOverRef.current) {
        setScore((prev) => {
          document.getElementById('score').innerText = `Score: ${prev + 1}`;
          return prev + 1;
        });
      }
    }, 100);

    const difficultyInterval = setInterval(() => {
      if (gameOverRef.current) return;
      setDifficulty((prev) => {
        const next = prev + 1;
        document.getElementById('difficulty').innerText = `Nível: ${next}`;
        const speed = Math.max(2.4 - next * 0.2, 0.6);
        if (pipeRef.current) {
          pipeRef.current.style.animationDuration = `${speed}s`;
        }
        const jumpHeight = 180 + next * 10;
        document.documentElement.style.setProperty('--jump-height', `${jumpHeight}px`);
        return next;
      });
    }, 10000);

    const loop = setInterval(() => {
      const mario = marioRef.current;
      const pipe = pipeRef.current;
      if (!mario || !pipe || gameOverRef.current) return;

      const marioRectRaw = mario.getBoundingClientRect();
      const pipeRect = pipe.getBoundingClientRect();

      const marioRect = {
        top: marioRectRaw.top + 5,
        bottom: marioRectRaw.bottom - 5,
        left: marioRectRaw.left + 10,
        right: marioRectRaw.right - 10,
      };

      const isColliding = !(
        marioRect.right < pipeRect.left ||
        marioRect.left > pipeRect.right ||
        marioRect.bottom < pipeRect.top ||
        marioRect.top > pipeRect.bottom
      );

      if (isColliding) {
        pipe.style.animation = 'none';
        mario.style.animation = 'none';
        pipe.style.left = `${pipe.offsetLeft}px`;
        mario.style.left = `${mario.offsetLeft}px`;
        mario.style.bottom = window.getComputedStyle(mario).bottom;

        mario.src = gameover;
        mario.classList.add('game-over');

        clearInterval(loop);
        clearInterval(scoreInterval);
        clearInterval(difficultyInterval);
        setIsGameOver(true);
        setShowRestart(true);

        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
        }

        if (gameoverSoundRef.current) {
          gameoverSoundRef.current.currentTime = 0;
          gameoverSoundRef.current.play();
        }

        setTimeout(() => {
          const player = prompt('Digite seu nome:');
          if (player) {
            fetch('http://localhost:8000/api/score', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ player, points: score }),
            });
          }
        }, 100);
      }
    }, 10);

    // Eventos para teclado e toque (mobile)
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);

    return () => {
      document.removeEventListener('keydown', jump);
      document.removeEventListener('touchstart', jump);
      clearInterval(loop);
      clearInterval(scoreInterval);
      clearInterval(difficultyInterval);
    };
  }, [score]);

  return (
    <div className="game-board">
      <audio ref={backgroundMusicRef} src={mariomusicFile} loop />
      <audio ref={jumpSoundRef} src={jumpSoundFile} />
      <audio ref={gameoverSoundRef} src={gameoverSoundFile} />

      <img src={clouds} className="clouds" alt="nuvens" />
      <img ref={marioRef} src={mario} className="mario" alt="mario" />
      <img ref={pipeRef} src={pipe} className="pipe" alt="tubo" />

      {showRestart && (
        <button className="restart-button" onClick={restartGame}>
          RESTART
        </button>
      )}
    </div>
  );
}
