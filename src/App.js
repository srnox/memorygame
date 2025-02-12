import React, { useState, useEffect } from 'react';
import { Bird, Cat, Dog, Fish, Rabbit, Squirrel, Turtle, Bug } from 'lucide-react';
import './App.css';

const CARD_PAIRS = [
  { id: 1, icon: Bird, name: 'Bird' },
  { id: 2, icon: Cat, name: 'Cat' },
  { id: 3, icon: Dog, name: 'Dog' },
  { id: 4, icon: Fish, name: 'Fish' },
  { id: 5, icon: Rabbit, name: 'Rabbit' },
  { id: 6, icon: Squirrel, name: 'Squirrel' },
  { id: 7, icon: Turtle, name: 'Turtle' },
  { id: 8, icon: Bug, name: 'Bug' }
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        uniqueId: index
      }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].id === cards[second].id) {
        setMatchedPairs([...matchedPairs, cards[first].id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs.length === CARD_PAIRS.length) {
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedPairs.includes(cards[index].id)
    ) {
      return;
    }
    setFlippedCards([...flippedCards, index]);
  };

  const resetGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        uniqueId: index
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white">Memory Game</h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-lg text-gray-300">Moves: {moves}</p>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                       transition-colors duration-200 text-sm font-semibold"
            >
              Reset Game
            </button>
          </div>
        </div>

        {gameWon && (
          <div className="text-center mb-4 py-2 bg-green-900 rounded-lg">
            <h2 className="text-xl font-bold text-green-100">
              Congratulations! You won in {moves} moves!
            </h2>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => {
            const isFlipped = flippedCards.includes(index);
            const isMatched = matchedPairs.includes(card.id);
            const Icon = card.icon;

            return (
              <button
                key={card.uniqueId}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-lg transition-all duration-300 transform
                  ${isFlipped || isMatched 
                    ? 'bg-gray-800 border-2 border-blue-500' 
                    : 'bg-gray-700 hover:bg-gray-600'
                  } shadow-lg`}
                disabled={isMatched}
              >
                <div
                  className={`w-full h-full flex items-center justify-center
                    ${isFlipped || isMatched ? 'visible' : 'invisible'}`}
                >
                  <Icon 
                    className="w-8 h-8 text-blue-400" 
                    aria-label={card.name}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;