import GameBoard from './GameBoard';

function App() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <h2 id="score">Score: 0</h2>
      <h3 id="difficulty">Nível: 1</h3>
      <GameBoard />
    </div>
  );
}

export default App;
