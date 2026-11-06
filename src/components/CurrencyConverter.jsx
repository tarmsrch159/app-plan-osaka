import React, { useState } from 'react';

export default function CurrencyConverter({ isOpen, onClose }) {
  const [jpyAmount, setJpyAmount] = useState('1000');
  const [rate, setRate] = useState(0.24); // 1 JPY = 0.24 THB default

  if (!isOpen) return null;

  const thbAmount = ((parseFloat(jpyAmount) || 0) * rate).toLocaleString('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });

  const quickPresets = [500, 1000, 2000, 3000, 5000, 10000, 20000];

  return (
    <div className="cute-modal-backdrop" onClick={onClose}>
      <div className="cute-tool-card" onClick={(e) => e.stopPropagation()}>
        <div className="tool-card-header">
          <div className="tool-header-left">
            <span className="tool-emoji">💴 ➔ ฿</span>
            <h3 className="tool-title">แปลงเงินเยนเป็นเงินบาท</h3>
          </div>
          <button className="cute-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tool-card-body">
          {/* Main Converter Input */}
          <div className="converter-input-group">
            <div className="converter-field">
              <label>จำนวนเงินเยน (JPY 💴)</label>
              <div className="input-wrap">
                <input
                  type="number"
                  value={jpyAmount}
                  onChange={(e) => setJpyAmount(e.target.value)}
                  placeholder="0"
                  className="currency-input"
                  autoFocus
                />
                <span className="unit-badge">¥ เยน</span>
              </div>
            </div>

            <div className="converter-arrow">➔</div>

            <div className="converter-field result">
              <label>คิดเป็นเงินไทยประมาณ (THB ฿)</label>
              <div className="currency-result-box">
                <span className="result-number">≈ ฿{thbAmount}</span>
                <span className="unit-badge thb">บาท</span>
              </div>
            </div>
          </div>

          {/* Rate Setting */}
          <div className="exchange-rate-row">
            <span>เรทอัตราแลกเปลี่ยน: 1 JPY =</span>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="rate-input"
            />
            <span>บาท</span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="presets-section">
            <div className="presets-label">⚡ แตะเลือกจำนวนเงินด่วน:</div>
            <div className="presets-chips">
              {quickPresets.map((val) => (
                <button
                  key={val}
                  className={`preset-btn ${jpyAmount === String(val) ? 'active' : ''}`}
                  onClick={() => setJpyAmount(String(val))}
                >
                  ¥{val.toLocaleString()} (≈ ฿{(val * rate).toFixed(0)})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

