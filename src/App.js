import "./App.css";
import { useEffect, useState } from "react";
// import Home from "./Home";
import SingleCard from "./components/SingleCard";
const cardImg = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);

    //console.log(cards, turns);
  };
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };
  //compare 2 card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        // console.log("those cards are matched");
        resetTurn();
      } else {
        // console.log("do not match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  //start automatically!
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game!</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>

      {/* <p>Turns :{turns}</p> */}
    </div>
  );
}

export default App;
