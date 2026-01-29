import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ArrowLeftRight, Info } from "lucide-react";
import { countryData, currencyOptions } from "./codes";
import "./App.css";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState({ value: "USD", label: "USD" });
  const [toCurr, setToCurr] = useState({ value: "INR", label: "INR" });
  const [resultMsg, setResultMsg] = useState("Fetching rate...");
  const [displayInfo, setDisplayInfo] = useState(false);

  const updateExchangeRate = async () => {
    let amtVal = amount < 1 ? 1 : amount;
    try {
      const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
      const response = await fetch(URL);
      const data = await response.json();
      const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
      const finalAmount = (amtVal * rate).toFixed(2);
      setResultMsg(`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`);
    } catch (error) {
      setResultMsg("Error fetching rate!");
    }
  };

  useEffect(() => { updateExchangeRate(); }, []);

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: "transparent",
      border: "none",
      boxShadow: "none",
      minWidth: "120px",
    }),
  };

  return (
    <div className="container">
      <div className="top-nav">
        <button className="info-link" onClick={() => setDisplayInfo(!displayInfo)}>
          <Info size={14} /> {displayInfo ? "Hide Details" : "Show Info"}
        </button>
      </div>

      <h2>Currency Converter</h2>

      {displayInfo && (
        <div className="details-panel">
          <p><strong>From:</strong> {countryData[fromCurr.value].name} ({countryData[fromCurr.value].country})</p>
          <p><strong>To:</strong> {countryData[toCurr.value].name} ({countryData[toCurr.value].country})</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); updateExchangeRate(); }}>
        <div className="amount">
          <p>Enter Amount</p>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" />
        </div>

        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              <img src={`https://flagsapi.com/${countryData[fromCurr.value].flag}/flat/64.png`} alt="flag" />
              <Select options={currencyOptions} value={fromCurr} onChange={setFromCurr} styles={selectStyles} />
            </div>
          </div>

          <div className="swap-icon-wrapper" onClick={handleSwap}>
            <ArrowLeftRight size={24} />
          </div>

          <div className="to">
            <p>To</p>
            <div className="select-container">
              <img src={`https://flagsapi.com/${countryData[toCurr.value].flag}/flat/64.png`} alt="flag" />
              <Select options={currencyOptions} value={toCurr} onChange={setToCurr} styles={selectStyles} />
            </div>
          </div>
        </div>

        <div className="msg">{resultMsg}</div>
        <button type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
}

export default App;