import React from 'react';

export default function WeatherOutfitGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  const weatherCards = [
    {
      city: 'โอซาก้า (Osaka)',
      emoji: '🏙️🍁',
      temp: '10°C - 16°C',
      feel: 'อากาศเย็นสบาย ลมพัดช่วงริมคลองและดาดฟ้าตึก',
      tip: 'ช่วงค่ำที่ริมคลองโดทงโบริ และดาดฟ้า Umeda Sky Building ลมจะค่อนข้างแรง เตรียมผ้าพันคอหรือแจ็คเก็ตกันลม'
    },
    {
      city: 'เกียวโต (Kyoto)',
      emoji: '⛩️🍂',
      temp: '8°C - 14°C',
      feel: 'หนาวกว่าโอซาก้า โดยเฉพาะป่าไผ่อาราชิยามะและวัดน้ำใส',
      tip: 'ช่วงเช้าตรู่ที่ป่าไผ่ และช่วงเย็นชม Light-up อากาศจะเย็นลงเร็ว แนะนำใส่ Heattech ชั้นใน + เสื้อคลุมหนา'
    },
    {
      city: 'นารา (Nara)',
      emoji: '🦌🌲',
      temp: '9°C - 15°C',
      feel: 'เย็นสดชื่น อากาศในสวนกว้างโปร่ง',
      tip: 'เดินกลางแจ้งเยอะ ใส่รองเท้าผ้าใบคู่เก่ง และเสื้อกันหนาวที่ถอดง่ายเวลาเดินขึ้นเนิน'
    },
    {
      city: 'สวนสนุก USJ',
      emoji: '🎢🌊',
      temp: '9°C - 15°C',
      feel: 'ติดริมอ่าวโอซาก้า ลมทะเลพัดเย็นต่อเนื่องตลอดวัน',
      tip: 'อยู่กลางแจ้งทั้งวันตั้งแต่ 08:00 ถึง 20:00 น. แนะนำเสื้อแจ็คเก็ตอุ่นๆ + ถุงร้อนไคโระ (Kairo) พกในกระเป๋าเสื้อ'
    }
  ];

  return (
    <div className="cute-modal-backdrop" onClick={onClose}>
      <div className="cute-tool-card" onClick={(e) => e.stopPropagation()}>
        <div className="tool-card-header">
          <div className="tool-header-left">
            <span className="tool-emoji">🧣🍁</span>
            <h3 className="tool-title">สภาพอากาศ & แนะนำการแต่งกาย (21 - 28 พ.ย.)</h3>
          </div>
          <button className="cute-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tool-card-body">
          {/* Summary Box */}
          <div className="weather-overview-banner">
            <div className="overview-icon">🍂❄️</div>
            <div>
              <h4>ช่วงปลายฤดูใบไม้เปลี่ยนสี & เริ่มต้นลมหนาว</h4>
              <p>อุณหภูมิเฉลี่ย 8°C - 16°C อากาศเย็นสบายตลอดวัน แต่เช้าตรู่และค่ำจะหนาว</p>
            </div>
          </div>

          {/* Outfit Formula */}
          <div className="outfit-formula-card">
            <div className="formula-title">✨ สูตรแต่งตัว 3 ชั้น เที่ยวสบายไม่หนักตัว:</div>
            <div className="formula-steps">
              <div className="formula-step">
                <span className="step-num">1</span>
                <span className="step-icon">👕</span>
                <span className="step-text"><strong>ชั้นใน:</strong> เสื้อ Heattech (ซื้อเพิ่มที่ Uniqlo Shinsaibashi วันแรก)</span>
              </div>
              <div className="formula-step">
                <span className="step-num">2</span>
                <span className="step-icon">🧶</span>
                <span className="step-text"><strong>ชั้นกลาง:</strong> เสื้อสเวตเตอร์ไหมพรม หรือคาร์ดิแกนน่ารักๆ</span>
              </div>
              <div className="formula-step">
                <span className="step-num">3</span>
                <span className="step-icon">🧥</span>
                <span className="step-text"><strong>ชั้นนอก:</strong> เสื้อโค้ท แจ็คเก็ตบุนวม หรือ Trench Coat กันลม</span>
              </div>
            </div>
          </div>

          {/* City Weather Cards */}
          <div className="city-weather-grid">
            {weatherCards.map((c, idx) => (
              <div key={idx} className="city-weather-item">
                <div className="city-weather-top">
                  <span className="city-name">{c.city}</span>
                  <span className="city-temp">{c.temp}</span>
                </div>
                <div className="city-feel">{c.feel}</div>
                <div className="city-tip">💡 {c.tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

