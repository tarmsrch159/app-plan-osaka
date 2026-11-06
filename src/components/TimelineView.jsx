import React from 'react';

export default function TimelineView({
  spots,
  selectedDay,
  onSelectSpot,
  onOpenMapWithSpot,
  checkedSpots = [],
  onToggleCheckIn
}) {
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

  // Filter spots solely by day to save vertical screen space (removed category filter bar)
  const filteredSpots = spots.filter(
    (spot) => selectedDay === 'all' || spot.day === Number(selectedDay)
  );

  return (
    <div className="clean-timeline-wrapper">
      {/* Spot Cards List (Directly displayed without redundant category bar) */}
      <div className="clean-spots-list">
        {filteredSpots.map((spot, index) => {
          const isChecked = checkedSpots.includes(spot.id);
          return (
            <div
              key={spot.id}
              className={`clean-spot-card ${isChecked ? 'is-checked-card' : ''}`}
              onClick={() => onSelectSpot(spot)}
            >
              <div className="spot-card-top">
                <span className="spot-time-pill">⏰ {spot.time}</span>
                <span className="spot-day-pill">Day {spot.day}</span>
                <span className="spot-cat-pill">{spot.category}</span>

                {/* Check-in Toggle Button */}
                <button
                  type="button"
                  className={`checkin-pill-btn ${isChecked ? 'checked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleCheckIn) onToggleCheckIn(spot.id);
                  }}
                  title={isChecked ? 'แตะเพื่อยกเลิกเช็คอิน' : 'แตะเพื่อเช็คอิน'}
                >
                  {isChecked ? '✅ เช็คอินแล้ว' : '⚪ เช็คอิน'}
                </button>
              </div>

              <div className="spot-card-header">
                <span className="spot-emoji">{spot.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="spot-name">{spot.title}</h3>
                  {spot.subtitle && <p className="spot-sub">{spot.subtitle}</p>}
                </div>
              </div>

              <p className="spot-desc whitespace-pre-line">{renderTextWithLinks(spot.desc)}</p>

              {spot.route && (
                <div className="spot-route-box whitespace-pre-line">
                  <span>🚶</span>
                  <span className="route-text">{renderTextWithLinks(spot.route)}</span>
                </div>
              )}

              {/* Cost Preview */}
              <div className="spot-costs-preview">
                <div className="cost-tag user">
                  <span>🙋‍♀️ คุณ: {spot.costUser || '-'}</span>
                </div>
                <div className="cost-tag mom">
                  <span>👩‍👧 แม่: {spot.costMom || '-'}</span>
                </div>
              </div>

              {/* Card Buttons */}
              <div className="spot-card-actions">
                <button
                  className="action-btn map"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenMapWithSpot(spot);
                  }}
                >
                  🗺️ ดูบนแผนที่
                </button>

                {spot.mapUrl && (
                  <a
                    href={spot.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn gmaps"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📍 นำทาง ↗
                  </a>
                )}

                <button
                  className="action-btn detail"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSpot(spot);
                  }}
                >
                  ดูแผน ➔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
