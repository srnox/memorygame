import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Camera, Heart, Star, Moon, Sun, Cloud } from 'lucide-react';

const CARD_PAIRS = [
  { id: 1, icon: Sparkles },
  { id: 2, icon: Music },
  { id: 3, icon: Camera },
  { id: 4, icon: Heart },
  { id: 5, icon: Star },
  { id: 6, icon: Moon },
  { id: 7, icon: Sun },
  { id: 8, icon: Cloud }
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        uniqueId: index
      }));
    setCards(shuffledCards);
  }, []);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].id === cards[second].id) {
        setMatchedPairs([...matchedPairs, cards[first].id]);
        setFlippedCards([]);
      } else {
        // If no match, flip cards back after delay
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  // Check for win
  useEffect(() => {
    if (matchedPairs.length === CARD_PAIRS.length) {
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 || // Don't allow more than 2 cards flipped
      flippedCards.includes(index) || // Don't allow same card to be flipped
      matchedPairs.includes(cards[index].id) // Don't allow matched cards to be flipped
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Memory Game</h1>
        <p className="text-lg mb-2">Moves: {moves}</p>
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reset Game
        </button>
      </div>

      {gameWon && (
        <div className="text-center mb-4 p-4 bg-green-100 rounded">
          <h2 className="text-2xl font-bold text-green-700">
            Congratulations! You won in {moves} moves!
          </h2>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedPairs.includes(card.id);
          const Icon = card.icon;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg transition-all duration-300 transform ${
                isFlipped || isMatched
                  ? 'bg-white border-2 border-blue-500'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={isMatched}
            >
              <div
                className={`w-full h-full flex items-center justify-center ${
                  isFlipped || isMatched ? 'visible' : 'invisible'
                }`}
              >
                <Icon className="w-8 h-8 text-blue-500" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;