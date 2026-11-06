import React from 'react';

export default function CheckInPromptModal({
  dialogData,
  onClose,
  onCheckInTargetOnly,
  onCheckInAllPriorAndTarget
}) {
  if (!dialogData) return null;

  const { targetSpot, missingPrior } = dialogData;
  const isSingle = missingPrior.length === 1;

  return (
    <div className="cute-modal-backdrop" onClick={onClose} style={{ zIndex: 3000 }}>
      <div className="checkin-prompt-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Icon */}
        <div className="prompt-icon-bubble">
          {isSingle ? '⚠️' : '📋'}
        </div>

        {/* Title */}
        <h3 className="prompt-title">
          {isSingle ? 'กรุณาเช็คอินสถานที่ก่อนหน้า' : `ยังไม่ได้เช็คอินสถานที่ก่อนหน้า ${missingPrior.length} แห่ง`}
        </h3>

        {/* Description Content */}
        {isSingle ? (
          <div className="prompt-single-content">
            <p className="prompt-desc-text">
              คุณกำลังจะเช็คอิน <strong>{targetSpot.title}</strong> แต่ยังไม่ได้เช็คอินสถานที่ก่อนหน้านี้:
            </p>
            <div className="prompt-spot-item single">
              <span className="item-emoji">{missingPrior[0].emoji}</span>
              <div className="item-info">
                <span className="item-title">{missingPrior[0].title}</span>
                <span className="item-time">⏰ {missingPrior[0].time}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="prompt-multiple-content">
            <p className="prompt-desc-text">
              คุณข้ามมาเช็คอิน <strong>{targetSpot.title}</strong> โดยยังมีสถานที่ก่อนหน้าที่ยังไม่ได้เช็คอิน {missingPrior.length} จุด:
            </p>
            <div className="prompt-missing-scroll">
              {missingPrior.map((s, idx) => (
                <div key={s.id} className="prompt-spot-item">
                  <span className="item-seq">{idx + 1}</span>
                  <span className="item-emoji">{s.emoji}</span>
                  <span className="item-title">{s.title}</span>
                  <span className="item-time">{s.time.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="prompt-action-buttons">
          {/* Primary Action (Auto check-in prior spots + target spot) */}
          <button
            type="button"
            className="prompt-btn primary"
            onClick={() => onCheckInAllPriorAndTarget(targetSpot, missingPrior)}
          >
            {isSingle ? (
              <>✅ เช็คอินจุดก่อนหน้าและจุดนี้ด้วยเลย</>
            ) : (
              <>✨ เช็คอินอัตโนมัติสถานที่ก่อนหน้าทั้งหมดที่ไปมาแล้ว</>
            )}
          </button>

          {/* Secondary Action (Only this spot) */}
          <button
            type="button"
            className="prompt-btn secondary"
            onClick={() => onCheckInTargetOnly(targetSpot)}
          >
            เช็คอินเฉพาะจุดนี้
          </button>

          {/* Cancel */}
          <button
            type="button"
            className="prompt-btn cancel"
            onClick={onClose}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

