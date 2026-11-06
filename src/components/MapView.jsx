import React, { useEffect, useRef, useState } from 'react';

const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION = '&copy; OpenStreetMap contributors';

export default function MapView({ spots, selectedDay, focusedSpot, onFocusSpot, onOpenDetail, checkedSpots = [], onToggleCheckIn }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const stepStripRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [internalSpot, setInternalSpot] = useState(null);

  // Touch swipe states
  const touchStartXRef = useRef(null);

  // Filter spots for active day
  const filteredSpots = spots.filter(
    (s) => (selectedDay === 'all' || s.day === Number(selectedDay)) && s.lat && s.lng && s.lat > 20
  );

  // Active Spot (or default to first spot of the day)
  const currentSpot = focusedSpot || internalSpot;
  const isCurrentDaySpot = currentSpot && filteredSpots.some((s) => s.id === currentSpot.id);
  const displaySpot = isCurrentDaySpot ? currentSpot : (filteredSpots.length > 0 ? filteredSpots[0] : null);
  const displayIndex = filteredSpots.findIndex((s) => s.id === displaySpot?.id);

  // Next spot to preview what's coming up next
  const nextSpot = displayIndex >= 0 && displayIndex < filteredSpots.length - 1 ? filteredSpots[displayIndex + 1] : null;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!window.L) return;

    if (!mapInstanceRef.current && mapContainerRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: [34.6937, 135.5023],
        zoom: 12,
        zoomControl: false
      });

      window.L.tileLayer(OSM_TILE_URL, {
        attribution: OSM_ATTRIBUTION,
        maxZoom: 19
      }).addTo(map);

      window.L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayerRef.current = window.L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      setMapLoaded(true);
    }
  }, []);

  // Update Markers and Polyline when spots or selectedDay changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer || !window.L) return;

    markersLayer.clearLayers();

    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    if (filteredSpots.length === 0) return;

    const latLngs = [];

    filteredSpots.forEach((spot, index) => {
      const isSelected = displaySpot?.id === spot.id;
      const isChecked = checkedSpots.includes(spot.id);
      latLngs.push([spot.lat, spot.lng]);

      const customIcon = window.L.divIcon({
        className: 'cute-custom-pin-wrapper',
        html: `
          <div class="cute-pin ${isSelected ? 'is-active-pin' : ''} ${isChecked ? 'is-checked-pin' : ''}" style="--pin-color: ${isChecked ? '#2ed573' : getCategoryColor(spot.category)}">
            <div class="pin-badge ${isChecked ? 'checked' : ''}">${isChecked ? '✓' : index + 1}</div>
            <div class="pin-emoji">${spot.emoji}</div>
          </div>
          <div class="pin-label-pill">${spot.title.length > 16 ? spot.title.substring(0, 14) + '...' : spot.title}</div>
        `,
        iconSize: [40, 52],
        iconAnchor: [20, 50],
        popupAnchor: [0, -45]
      });

      const marker = window.L.marker([spot.lat, spot.lng], { icon: customIcon });

      // Clicking marker changes focus and centers map, but DOES NOT open detail modal!
      marker.on('click', () => {
        handleSelectIndex(index);
        if (window.confetti) {
          window.confetti({ particleCount: 15, spread: 40, origin: { y: 0.8 } });
        }
      });

      marker.addTo(markersLayer);
    });

    if (selectedDay !== 'all' && latLngs.length > 1) {
      const polyline = window.L.polyline(latLngs, {
        color: '#FF4757',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      routePolylineRef.current = polyline;
    }

    if (latLngs.length > 0) {
      if (displaySpot && displaySpot.lat && displaySpot.lng && displaySpot.lat > 20) {
        map.flyTo([displaySpot.lat, displaySpot.lng], 15, { duration: 1 });
      } else {
        const bounds = window.L.latLngBounds(latLngs);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, animate: true });
      }
    }
  }, [spots, selectedDay, displaySpot?.id, mapLoaded, checkedSpots]);

  // Auto scroll the step strip to keep the active spot in view
  useEffect(() => {
    if (stepStripRef.current && displayIndex >= 0) {
      const activeEl = stepStripRef.current.children[displayIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [displayIndex]);

  function getCategoryColor(cat) {
    if (cat?.includes('สนามบิน') || cat?.includes('กลับ')) return '#34495e';
    if (cat?.includes('อาหาร') || cat?.includes('ตลาด')) return '#ff793f';
    if (cat?.includes('ช็อปปิ้ง')) return '#ff5252';
    if (cat?.includes('วัด') || cat?.includes('ศาลเจ้า')) return '#b33939';
    if (cat?.includes('สวนสนุก')) return '#2ed573';
    if (cat?.includes('ชมวิว')) return '#3742fa';
    if (cat?.includes('ที่พัก')) return '#8854d0';
    return '#ff6b81';
  }

  const handleSelectIndex = (idx) => {
    if (idx >= 0 && idx < filteredSpots.length) {
      const target = filteredSpots[idx];
      setInternalSpot(target);
      if (onFocusSpot) onFocusSpot(target);
      if (mapInstanceRef.current && target.lat && target.lng) {
        mapInstanceRef.current.flyTo([target.lat, target.lng], 15, { duration: 0.8 });
      }
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (displayIndex > 0) {
      handleSelectIndex(displayIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (displayIndex < filteredSpots.length - 1) {
      handleSelectIndex(displayIndex + 1);
    }
  };

  const handleOpenGmaps = (e) => {
    e.stopPropagation();
    if (!displaySpot) return;
    if (displaySpot.mapUrl) {
      window.open(displaySpot.mapUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displaySpot.title + ' Japan')}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Touch Swipe on Card
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (diff > 50) {
      handleNext(e); // Swipe left = Next
    } else if (diff < -50) {
      handlePrev(e); // Swipe right = Prev
    }
  };

  return (
    <div className="fullscreen-map-wrapper">
      <div ref={mapContainerRef} className="leaflet-map-element" />

      {/* Bottom Floating Step Navigation Panel */}
      {displaySpot && (
        <div className="bottom-itinerary-panel">
          {/* 1. Quick Step Strip: See all spots & tap to jump! */}
          {filteredSpots.length > 1 && (
            <div className="quick-step-strip-wrapper">
              <div className="quick-step-strip" ref={stepStripRef}>
                {filteredSpots.map((spot, idx) => {
                  const isActive = idx === displayIndex;
                  const isChecked = checkedSpots.includes(spot.id);
                  return (
                    <button
                      key={spot.id}
                      className={`step-bubble-btn ${isActive ? 'active' : ''} ${isChecked ? 'is-checked-step' : ''}`}
                      onClick={() => handleSelectIndex(idx)}
                      title={`${spot.time} - ${spot.title}${isChecked ? ' (เช็คอินแล้ว)' : ''}`}
                    >
                      <span className={`step-num ${isChecked ? 'checked' : ''}`}>{isChecked ? '✓' : idx + 1}</span>
                      <span className="step-emoji">{spot.emoji}</span>
                      <span className="step-time">{spot.time.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Main Active Spot Card (Title-first, clear preview of what's next) */}
          <div
            className="active-spot-card"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Card Header Row */}
            <div className="card-meta-row">
              <span className="step-progress-badge">
                จุดที่ {displayIndex + 1} / {filteredSpots.length}
              </span>
              <span className="card-time-badge">⏰ {displaySpot.time}</span>
              <span className="card-cat-badge">{displaySpot.category}</span>

              {/* Check-in toggle button right on the card */}
              <button
                type="button"
                className={`map-card-checkin-btn ${checkedSpots.includes(displaySpot.id) ? 'checked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleCheckIn) {
                    onToggleCheckIn(displaySpot.id);
                    if (!checkedSpots.includes(displaySpot.id) && window.confetti) {
                      window.confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
                    }
                  }
                }}
                title={checkedSpots.includes(displaySpot.id) ? 'แตะเพื่อยกเลิกเช็คอิน' : 'แตะเพื่อเช็คอิน'}
              >
                {checkedSpots.includes(displaySpot.id) ? '✅ เช็คอินแล้ว' : '⚪ เช็คอิน'}
              </button>
            </div>

            {/* Current Spot Title */}
            <div className="card-title-row">
              <span className="spot-big-emoji">{displaySpot.emoji}</span>
              <div className="spot-title-texts">
                <h3 className="spot-main-title">{displaySpot.title}</h3>
                <p className="spot-sub-title">
                  {displaySpot.subtitle || displaySpot.desc}
                </p>
              </div>
            </div>

            {/* What's Next Teaser Bar (รู้ทันทีว่าจุดถัดไปคืออะไร) */}
            {nextSpot ? (
              <div
                className="card-next-preview"
                onClick={() => handleSelectIndex(displayIndex + 1)}
                title="แตะเพื่อข้ามไปดูจุดถัดไป"
              >
                <span className="next-badge">ถัดไป ➔</span>
                <span className="next-time">⏰ {nextSpot.time.split(' ')[0]}</span>
                <span className="next-emoji">{nextSpot.emoji}</span>
                <span className="next-title">{nextSpot.title}</span>
              </div>
            ) : (
              <div className="card-next-preview is-end">
                <span>🏁 จุดสุดท้ายของวันนี้แล้วค่ะ 💤</span>
              </div>
            )}

            {/* Bottom Actions Row: Large, easy to tap buttons */}
            <div className="card-button-actions">
              <button
                className="step-nav-btn prev"
                onClick={handlePrev}
                disabled={displayIndex <= 0}
                title="จุดก่อนหน้า"
              >
                ‹ ก่อนหน้า
              </button>

              <button
                className="step-action-btn gmaps"
                onClick={handleOpenGmaps}
              >
                📍 นำทาง
              </button>

              <button
                className="step-action-btn details"
                onClick={() => {
                  if (onOpenDetail && displaySpot) {
                    onOpenDetail(displaySpot);
                  }
                }}
              >
                รายละเอียด 📋
              </button>

              <button
                className="step-nav-btn next"
                onClick={handleNext}
                disabled={displayIndex >= filteredSpots.length - 1}
                title="จุดถัดไป"
              >
                ถัดไป ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
