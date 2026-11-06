import React from 'react';

export default function Navbar({ activeTab, onSelectTab, checkedSpotsCount = 0, onResetCheckIns }) {
  return (
    <header className="clean-app-header">
      <div className="clean-brand">
        <span className="brand-icon">🌸</span>
        <div>
          <h1 className="brand-name">Kansai Trip</h1>
          <span className="brand-dates">21 - 28 พ.ย. 2026</span>
        </div>
      </div>

      <div className="header-right-actions">
        {checkedSpotsCount > 0 && (
          <button
            type="button"
            className="clean-reset-checkin-btn"
            onClick={onResetCheckIns}
            title="รีเซ็ตการเช็คอินทั้งหมดกลับเป็น 0 ก่อนเริ่มทริป"
          >
            <span className="reset-icon">🔄</span>
            <span className="reset-badge">เช็คแล้ว {checkedSpotsCount}</span>
          </button>
        )}

        {/* Clean Tab Switcher (Map vs Plan) */}
        <nav className="clean-tab-switch">
          <button
            className={`tab-switch-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => onSelectTab('map')}
          >
            🗺️ แผนที่
          </button>
          <button
            className={`tab-switch-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => onSelectTab('timeline')}
          >
            📋 แพลน
          </button>
        </nav>
      </div>
    </header>
  );
}
