import React from 'react';
import { tripDays } from '../data/tripData';

export default function DaySelector({ selectedDay, onSelectDay }) {
  return (
    <div className="clean-day-selector">
      <div className="clean-day-scroll">
        <button
          className={`day-pill ${selectedDay === 'all' ? 'active' : ''}`}
          onClick={() => onSelectDay('all')}
          title="ดูแผนที่และตารางทั้งหมด 8 วัน"
        >
          <span className="day-pill-emoji">🗾</span>
          <span className="day-pill-title">ดูทั้งหมดทุกวัน</span>
          <span className="day-pill-date">21 - 28 พ.ย.</span>
        </button>

        {tripDays.map((d) => {
          const isActive = selectedDay === String(d.day);
          return (
            <button
              key={d.day}
              className={`day-pill ${isActive ? 'active' : ''}`}
              style={{
                '--pill-color': d.color
              }}
              onClick={() => onSelectDay(String(d.day))}
              title={`${d.date} : ${d.title}`}
            >
              <span className="day-pill-emoji">{d.emoji}</span>
              <span className="day-pill-badge">Day {d.day}</span>
              <span className="day-pill-title">{d.title}</span>
              <span className="day-pill-date">{d.date}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
