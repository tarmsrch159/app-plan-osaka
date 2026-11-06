import React, { useState } from 'react';
import { packingChecklist } from '../data/tripData';

export default function PackingChecklist() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('kansai_checklist_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return packingChecklist.map((item) => ({ ...item, checked: false }));
  });

  const toggleItem = (id) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      localStorage.setItem('kansai_checklist_state', JSON.stringify(updated));
      return updated;
    });

    if (window.confetti) {
      window.confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#FF6B81', '#70A1FF', '#2ED573']
      });
    }
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="cute-checklist-container">
      {/* Progress Bar */}
      <div className="progress-section-card">
        <div className="progress-header">
          <span>ความพร้อมของสัมภาระ</span>
          <span className="progress-number">{checkedCount} / {items.length} ({progressPercent}%)</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {progressPercent === 100 && (
          <div className="completed-congrats">
            ✓ จัดกระเป๋าครบถ้วนแล้ว
          </div>
        )}
      </div>

      {/* Checklist items */}
      <div className="checklist-items-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`checklist-item-card ${item.checked ? 'is-checked' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="checkbox-custom">
              {item.checked ? '✓' : ''}
            </div>
            <div className="checklist-text-col">
              <span className="item-cat-tag">{item.category}</span>
              <span className="item-text">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
