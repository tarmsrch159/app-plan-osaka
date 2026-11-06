import React from 'react';

export default function PinDetailModal({
  spot,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  hasPrev,
  hasNext,
  checkedSpots = [],
  onToggleCheckIn
}) {
  if (!spot) return null;

  const isChecked = checkedSpots.includes(spot.id);

  const renderTextWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-route-link"
            onClick={(e) => e.stopPropagation()}
          >
            {part} ↗
          </a>
        );
      }
      return part;
    });
  };

  const handleOpenGoogleMaps = () => {
    if (spot.mapUrl) {
      window.open(spot.mapUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.title + ' Japan')}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div className="cute-modal-backdrop" onClick={onClose}>
      <div className="cute-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cute-modal-header">
          <div className="cute-modal-badge">
            <span className="badge-day">Day {spot.day}</span>
            <span className="badge-time">⏰ {spot.time}</span>
            <span className="badge-cat">{spot.category}</span>
          </div>
          <button className="cute-close-btn" onClick={onClose} aria-label="ปิด">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="cute-modal-content">
          <div className="spot-title-row">
            <div className="spot-emoji-bounce">{spot.emoji}</div>
            <div className="spot-title-info">
              <h2 className="spot-title">{spot.title}</h2>
              {spot.subtitle && <p className="spot-subtitle">{spot.subtitle}</p>}
            </div>
          </div>

          {/* Activity Description */}
          <div className="cute-info-box desc-box">
            <div className="box-label">📝 รายละเอียดกิจกรรม</div>
            <div className="box-text whitespace-pre-line">{renderTextWithLinks(spot.desc)}</div>
          </div>

          {/* Route & Navigation */}
          {spot.route && (
            <div className="cute-info-box route-box">
              <div className="box-label">🚶 การเดินทาง</div>
              <div className="box-text route-text whitespace-pre-line">{renderTextWithLinks(spot.route)}</div>
            </div>
          )}

          {/* Check-in Toggle Button */}
          <button
            type="button"
            className={`modal-checkin-btn ${isChecked ? 'checked' : ''}`}
            onClick={() => {
              if (onToggleCheckIn) {
                onToggleCheckIn(spot.id);
                if (!isChecked && window.confetti) {
                  window.confetti({ particleCount: 30, spread: 70, origin: { y: 0.6 } });
                }
              }
            }}
          >
            {isChecked ? '✅ เช็คอินสถานที่นี้แล้ว (แตะเพื่อยกเลิก)' : '📍 แตะเพื่อเช็คอินสถานที่นี้'}
          </button>

          {/* Direct Google Maps Action Button */}
          <button className="big-gmaps-navigate-btn" onClick={handleOpenGoogleMaps}>
            📍 เปิดนำทางด้วย Google Maps ↗
          </button>

          {/* Costs Comparison (You vs Mom) */}
          <div className="costs-comparison-grid">
            <div className="cost-card cost-user">
              <div className="cost-header">
                <span className="cost-avatar">🙋‍♀️</span>
                <span className="cost-person">คุณ</span>
              </div>
              <div className="cost-val">{spot.costUser || '-'}</div>
            </div>

            <div className="cost-card cost-mom">
              <div className="cost-header">
                <span className="cost-avatar">👩‍👧</span>
                <span className="cost-person">คุณแม่</span>
              </div>
              <div className="cost-val">{spot.costMom || '-'}</div>
            </div>
          </div>

          {/* Tips / Highlights */}
          {spot.tips && spot.tips.length > 0 && (
            <div className="cute-info-box tips-box">
              <div className="box-label">💡 ข้อแนะนำ</div>
              <ul className="tips-list">
                {spot.tips.map((tip, idx) => (
                  <li key={idx}>✨ {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="cute-modal-footer">
          <button
            className="footer-nav-btn prev"
            onClick={onNavigatePrev}
            disabled={!hasPrev}
          >
            ← จุดก่อนหน้า
          </button>

          <button
            className="footer-nav-btn next"
            onClick={onNavigateNext}
            disabled={!hasNext}
          >
            จุดถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
}
