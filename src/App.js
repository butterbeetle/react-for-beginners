import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const [myUSD, setMyUSD] = useState(0);
  const onChange_USD = (event) => {
    //console.log(event.target.value);
    setMyUSD(event.target.value);
  }

  const calc = (usd, coinValue) => {
    //console.log(usd, coinValue);
    if (coinValue === 0 || usd === 0) {
      return 0
    }
    else {
      return Math.floor(usd / coinValue);
    }
  }

  const [buyCoin, setBuyCoin] = useState(0);
  const onChange_Select = (event) => {
    //console.log(event.target.value);
    setBuyCoin(event.target.value);
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onChange_USD}
        type="number"
        placeholder="Write Your USD" /> USD
      <br />
      {loading ? (<strong>Loading...</strong>) : (
        <select onChange={onChange_Select}>
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={(coin.quotes.USD.price).toFixed(3)}>
              {coin.name} ({coin.symbol}): ${(coin.quotes.USD.price).toFixed(3)} USD
            </option>
          ))}
        </select>
      )}
      <h3>You can buy {calc(myUSD, buyCoin)} Coin</h3>
    </div>
  );
}

export default App;
