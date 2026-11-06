import React from 'react';

export default function ResetConfirmModal({
  isOpen,
  checkedCount,
  onClose,
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div className="cute-modal-backdrop" onClick={onClose} style={{ zIndex: 3100 }}>
      <div className="checkin-prompt-dialog reset-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Icon */}
        <div className="prompt-icon-bubble reset">
          🔄
        </div>

        {/* Title */}
        <h3 className="prompt-title">
          รีเซ็ตการเช็คอินทั้งหมด?
        </h3>

        {/* Description Content */}
        <p className="prompt-desc-text text-center">
          คุณได้เช็คอินไปแล้ว <strong>{checkedCount} สถานที่</strong><br />
          ต้องการล้างประวัติกลับเป็น 0 เพื่อเริ่มใหม่ใช่ไหมคะ?<br />
          <span style={{ fontSize: '12px', color: '#888', marginTop: '6px', display: 'block' }}>
            (เหมาะสำหรับเคลียร์ข้อมูลที่ลองกดเล่น ก่อนเริ่มเดินทางจริงค่ะ)
          </span>
        </p>

        {/* Action Buttons */}
        <div className="prompt-action-buttons">
          <button
            type="button"
            className="prompt-btn danger"
            onClick={onConfirm}
          >
            🗑️ ยืนยันล้างข้อมูลทั้งหมด
          </button>

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

