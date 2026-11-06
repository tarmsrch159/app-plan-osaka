import React from 'react';
import { passSummary } from '../data/tripData';

export default function PassBudgetSummary() {
  return (
    <div className="cute-summary-container">
      {/* Quick Stats Grid */}
      <div className="stats-badges-grid">
        <div className="stat-pill">
          <span className="stat-icon">🚄</span>
          <div>
            <div className="stat-label">JR Haruka</div>
            <div className="stat-value">Premium C + ICOCA</div>
          </div>
        </div>

        <div className="stat-pill">
          <span className="stat-icon">⛩️</span>
          <div>
            <div className="stat-label">Day 3 เกียวโต</div>
            <div className="stat-value">Kansai Area 1-Day Pass</div>
          </div>
        </div>

        <div className="stat-pill">
          <span className="stat-icon">🍄</span>
          <div>
            <div className="stat-label">USJ Express</div>
            <div className="stat-value">คุณ: Ex 8 | แม่: Ex 4</div>
          </div>
        </div>

        <div className="stat-pill">
          <span className="stat-icon">🚂</span>
          <div>
            <div className="stat-label">รถไฟ Sagano</div>
            <div className="stat-value">ขบวน 3 (จองแล้ว)</div>
          </div>
        </div>
      </div>

      {/* Pass Cards List */}
      <div className="pass-cards-list">
        {passSummary.map((item, idx) => (
          <div key={idx} className="pass-card-item">
            <div className="pass-card-top">
              <span className="pass-emoji">{item.emoji}</span>
              <div className="pass-info">
                <span className="pass-cat-tag">{item.category}</span>
                <h3 className="pass-name">{item.name}</h3>
              </div>
            </div>

            <p className="pass-detail-text">{item.details}</p>

            <div className="pass-comparison-box">
              <div className="pass-user-col">
                <div className="person-tag user">🙋‍♀️ คุณ</div>
                <div className="person-value">{item.userPass}</div>
              </div>

              <div className="pass-divider" />

              <div className="pass-mom-col">
                <div className="person-tag mom">👩‍👧 คุณแม่</div>
                <div className="person-value">{item.momPass}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Box */}
      <div className="pro-tips-card">
        <div className="tips-title">💡 ข้อมูล Pass & เงินเยน</div>
        <ul className="tips-checklist">
          <li><strong>ICOCA Card:</strong> ใช้แตะ Osaka Metro, Kintetsu, Keihan, รถบัสเกียวโต และร้านสะดวกซื้อ</li>
          <li><strong>Tax Refund KIX (ระบบใหม่):</strong> ช็อปปิ้งเกิน ¥5,000 ต่อร้าน นำพาสปอร์ตและใบเสร็จไปสแกนที่ตู้คีออสก่อนโหลดสัมภาระ</li>
          <li><strong>เหรียญ 100 เยน:</strong> แลกเตรียมไว้สำหรับหยอดตู้กาชาปอง ตู้กดน้ำ และเซมเบ้กวางนารา</li>
        </ul>
      </div>
    </div>
  );
}
