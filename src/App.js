import React, { useState, useEffect } from 'react';
import { generatePassword, updatePassIndicator } from './passwordUtils';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(15);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [excludeDuplicate, setExcludeDuplicate] = useState(false);
  const [spaces, setSpaces] = useState(false);
  const [passIndicator, setPassIndicator] = useState('medium');
  const [copyStatus, setCopyStatus] = useState('copy_all');

  useEffect(() => {
    updateSlider();
  }, [length]);

  const handleGeneratePassword = () => {
    const settings = { lowercase, uppercase, numbers, symbols, excludeDuplicate, spaces };
    const newPassword = generatePassword(length, settings);
    setPassword(newPassword);
  };

  const updateSlider = () => {
    handleGeneratePassword();
    const newPassIndicator = updatePassIndicator(length);
    setPassIndicator(newPassIndicator);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopyStatus("check");
    setTimeout(() => {
      setCopyStatus("copy_all");
    }, 1500);
  };

  return (
    <div className="body">
      <div className="container">
        <h2 className="header">Password Generator</h2>
        <div className="wrapper">
          <div className="input-box">
            <input type="text" value={password} disabled className="input" />
            <span
              className="material-symbols-rounded copy-icon"
              onClick={copyPassword}
            >
              {copyStatus}
            </span>
          </div>
          <div className={`pass-indicator ${passIndicator}`}></div>
          <div className="pass-length">
            <div className="details">
              <label className="title">Password Length</label>
              <span>{length}</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={length}
              step="1"
              onChange={(e) => setLength(e.target.value)}
              className="range-input"
            />
          </div>
          <div className="pass-settings">
            <label className="title">Password Settings</label>
            <ul className="options">
              <li className="option">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={lowercase}
                  onChange={() => setLowercase(!lowercase)}
                />
                <label htmlFor="lowercase" className="label">Lowercase (a-z)</label>
              </li>
              <li className="option">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={uppercase}
                  onChange={() => setUppercase(!uppercase)}
                />
                <label htmlFor="uppercase" className="label">Uppercase (A-Z)</label>
              </li>
              <li className="option">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={numbers}
                  onChange={() => setNumbers(!numbers)}
                />
                <label htmlFor="numbers" className="label">Numbers (0-9)</label>
              </li>
              <li className="option">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={symbols}
                  onChange={() => setSymbols(!symbols)}
                />
                <label htmlFor="symbols" className="label">Symbols (!-$^+)</label>
              </li>
              <li className="option">
                <input
                  type="checkbox"
                  id="exc-duplicate"
                  checked={excludeDuplicate}
                  onChange={() => setExcludeDuplicate(!excludeDuplicate)}
                />
                <label htmlFor="exc-duplicate" className="label">Exclude Duplicate</label>
              </li>
              <li className="option">
                <input
                  type="checkbox"
                  id="spaces"
                  checked={spaces}
                  onChange={() => setSpaces(!spaces)}
                />
                <label htmlFor="spaces" className="label">Include Spaces</label>
              </li>
            </ul>
          </div>
          <button
            className="generate-btn"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
