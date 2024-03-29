import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {
  const BASE_URL = 'https://deckofcardsapi.com/api/deck/';

  const [deckId, setDeckId] = useState(null);
  const [drawedCards, setDrawedCards] = useState([]);
  const [shouldDrawCard, setShouldDrawCard] = useState(false);
  const [shouldReshuffle, setShouldReshuffle] = useState(false);

  useEffect(() => {
    if (shouldReshuffle) {
      axios.get(`${BASE_URL}${deckId}/shuffle/`).then(() => {
        setShouldReshuffle(false);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [shouldReshuffle])
  
  useEffect(() => {
    axios.get(`${BASE_URL}new/shuffle/?deck_count=1`).then((resp) => {
      setDeckId(resp.data.deck_id);
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  useEffect(() => {
    if (shouldDrawCard) {
      axios.get(`${BASE_URL}${deckId}/draw/?count=1`).then((resp) => {
        setDrawedCards([...drawedCards, <Card url={resp.data.cards[0].image} />]);
        setShouldDrawCard(false);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [shouldDrawCard])

  const handleDrawCard = () => {
    if (drawedCards.length === 52) {
      alert('Error: no cards remaining!');
    } else {
      setShouldDrawCard(true);
    }
  }

  const style1 = {
    position: 'relative',
    left: '200px'
  }

  const style2 = {
    position: 'relative',
    left: '400px'
  }

  const handleReshuffle = () => {
    setDrawedCards([]);
    setShouldReshuffle(true);
  }
  
  return (
    <>
      {deckId ? 
      <button style={style1} onClick={handleDrawCard}>Draw a card</button>
      : <h3>Loading</h3>}
      {!shouldReshuffle ? 
      <button style={style2} onClick={handleReshuffle}>Reshuffle</button>
      : <h3>Loading</h3>}
      {drawedCards ?
      drawedCards.map(card => card)
      : <div></div>
      }
    </>
  );
}

export default App;
