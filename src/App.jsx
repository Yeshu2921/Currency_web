import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ArrowLeftRight } from "lucide-react";
import { countryData, currencyOptions } from "./codes";
import "./App.css";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState({ value: "USD", label: "USD" });
  const [toCurr, setToCurr] = useState({ value: "INR", label: "INR" });
  const [resultMsg, setResultMsg] = useState("Fetching...");
  const [displayInfo, setDisplayInfo] = useState(false);

  const updateExchangeRate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`);
      const data = await response.json();
      const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
      setResultMsg(`${amount} ${fromCurr.value} = ${(amount * rate).toFixed(2)} ${toCurr.value}`);
    } catch (error) {
      setResultMsg("Error fetching rate!");
    }
  };

  useEffect(() => { updateExchangeRate(); }, []);

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "30px",
      fontSize: "0.9rem",
    }),
    menu: (base) => ({ ...base, zIndex: 9999 })
  };

  return (
    <div className="container">
      <div className="top-nav">
        <button className="info-link" onClick={() => setDisplayInfo(!displayInfo)}>
          {displayInfo ? "Hide" : "Show Info"}
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
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="dropdown">
          <div className="select-container">
            <img src={`https://flagsapi.com/${countryData[fromCurr.value].flag}/flat/64.png`} alt="flag" />
            <Select 
              options={currencyOptions} 
              value={fromCurr} 
              onChange={setFromCurr} 
              styles={selectStyles} 
              isSearchable={true} 
            />
          </div>

          <div className="swap-icon-wrapper" onClick={() => { setFromCurr(toCurr); setToCurr(fromCurr); }}>
            <ArrowLeftRight size={20} />
          </div>

          <div className="select-container">
            <img src={`https://flagsapi.com/${countryData[toCurr.value].flag}/flat/64.png`} alt="flag" />
            <Select 
              options={currencyOptions} 
              value={toCurr} 
              onChange={setToCurr} 
              styles={selectStyles} 
              isSearchable={true} 
            />
          </div>
        </div>

        <div className="msg">{resultMsg}</div>
        <button type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
}

export default App;