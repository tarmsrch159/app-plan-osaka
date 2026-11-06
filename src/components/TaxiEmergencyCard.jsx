import React from 'react';

export default function TaxiEmergencyCard({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cute-modal-backdrop" onClick={onClose}>
      <div className="cute-tool-card emergency-card-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tool-card-header">
          <div className="tool-header-left">
            <span className="tool-emoji">🚕🇯🇵</span>
            <h3 className="tool-title">นามบัตรแท็กซี่ & ข้อมูลฉุกเฉิน</h3>
          </div>
          <button className="cute-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tool-card-body">
          {/* Hotel Taxi Card (Big Japanese for driver) */}
          <div className="taxi-driver-card">
            <div className="taxi-card-badge">🚕 ยื่นให้คนขับแท็กซี่ดู (Show to Taxi Driver)</div>
            <div className="taxi-japanese-text">
              <div className="driver-greeting">運転手さん、このホテルまでお願いします：</div>
              <div className="hotel-ja-name">スマイルホテル大阪天王寺</div>
              <div className="hotel-ja-address">〒543-0056 大阪府大阪市天王寺区悲田院町8-1</div>
              <div className="hotel-tel">TEL: 06-6779-1111</div>
            </div>
            <div className="hotel-en-name">
              <strong>Smile Hotel Osaka Tennoji</strong>
              <span>(Near JR Tennoji Station North Exit)</span>
            </div>
          </div>

          {/* Useful Emergency Numbers in Japan */}
          <div className="emergency-contacts-section">
            <div className="emergency-title">🚨 เบอร์โทรฉุกเฉินในญี่ปุ่น</div>
            <div className="emergency-grid">
              <a href="tel:110" className="emergency-item police">
                <span className="em-icon">👮</span>
                <div>
                  <div className="em-name">ตำรวจ (Police)</div>
                  <div className="em-number">110</div>
                </div>
              </a>

              <a href="tel:119" className="emergency-item ambulance">
                <span className="em-icon">🚑</span>
                <div>
                  <div className="em-name">พยาบาล / ไฟไหม้</div>
                  <div className="em-number">119</div>
                </div>
              </a>

              <a href="tel:+81662629226" className="emergency-item embassy">
                <span className="em-icon">🇹🇭</span>
                <div>
                  <div className="em-name">สถานกงสุลใหญ่ ณ นครโอซาก้า</div>
                  <div className="em-number">06-6262-9226</div>
                </div>
              </a>

              <a href="tel:0570000911" className="emergency-item helpline">
                <span className="em-icon">ℹ️</span>
                <div>
                  <div className="em-name">Japan Visitor Hotline (24 ชม.)</div>
                  <div className="em-number">050-3816-2720</div>
                </div>
              </a>
            </div>
          </div>

          {/* Lost or Need Help Card */}
          <div className="lost-help-card">
            <div className="lost-title">🗣️ บัตรขอความช่วยเหลือกรณีหลงทาง:</div>
            <div className="lost-ja-box">
              <p className="lost-ja">道に迷ってしまいました。JR天王寺駅への行き方を教えていただけますか？</p>
              <p className="lost-romaji">Michi ni mayotte shimaimashita. JR Tennōji eki e no ikikata o oshiete itadakemasu ka?</p>
              <p className="lost-th">"ขอโทษนะคะ ฉันหลงทาง ช่วยบอกทางไปสถานี JR Tennoji หน่อยได้ไหมคะ?"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

