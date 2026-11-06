import React, { useState } from 'react';

export default function JapanesePhrases({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('shopping');

  if (!isOpen) return null;

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const categories = [
    { id: 'shopping', name: '🛍️ ช็อปปิ้ง & Tax Free' },
    { id: 'restaurant', name: '🍜 ร้านอาหาร & สั่งของกิน' },
    { id: 'travel', name: '🚅 รถไฟ & เดินทาง' },
    { id: 'general', name: '🌸 ทั่วไป & ขอความช่วยเหลือ' }
  ];

  const phrases = {
    shopping: [
      { ja: 'これをお願いします。', romaji: 'Kore o onegaishimasu', th: 'ขอชิ้นนี้ค่ะ (ชี้ของ)', icon: '🛍️' },
      { ja: 'いくらですか？', romaji: 'Ikura desu ka?', th: 'ราคาเท่าไหร่คะ?', icon: '🏷️' },
      { ja: '免税できますか？', romaji: 'Menzei dekimasu ka?', th: 'ทำ Tax Free ได้ไหมคะ?', icon: '📄' },
      { ja: 'クレジットカードは使えますか？', romaji: 'Kurejitto kādo wa tsukaemasu ka?', th: 'ใช้บัตรเครดิตได้ไหมคะ?', icon: '💳' },
      { ja: '袋をお願いします。', romaji: 'Fukuro o onegaishimasu', th: 'ขอถุงใส่ของด้วยค่ะ', icon: '🛍️' }
    ],
    restaurant: [
      { ja: '英語のメニューはありますか？', romaji: 'Eigo no menyū wa arimasu ka?', th: 'มีเมนูภาษาอังกฤษไหมคะ?', icon: '📖' },
      { ja: 'これとこれをお願いします。', romaji: 'Kore to kore o onegaishimasu', th: 'เอาอันนี้กับอันนี้ค่ะ', icon: '🍲' },
      { ja: 'お会計をお願いします。', romaji: 'O-kaikei onegaishimasu', th: 'เช็คบิล / เก็บเงินด้วยค่ะ', icon: '🧾' },
      { ja: 'とても美味しいです！', romaji: 'Totemo oishii desu!', th: 'อร่อยมากๆ เลยค่ะ!', icon: '😋' },
      { ja: 'お水をお願いします。', romaji: 'Omizu o onegaishimasu', th: 'ขอน้ำเปล่าหน่อยค่ะ', icon: '🥛' }
    ],
    travel: [
      { ja: 'トイレはどこですか？', romaji: 'Toire wa doko desu ka?', th: 'ห้องน้ำอยู่ตรงไหนคะ?', icon: '🚻' },
      { ja: '天王寺駅はどこですか？', romaji: 'Tennōji eki wa doko desu ka?', th: 'สถานีเทนโนจิไปทางไหนคะ?', icon: '🚉' },
      { ja: 'この電車は京都に行きますか？', romaji: 'Kono densha wa Kyōto ni ikimasu ka?', th: 'รถไฟขบวนนี้ไปเกียวโตไหมคะ?', icon: '🚄' },
      { ja: '切符売り場はどこですか？', romaji: 'Kippu uriba wa doko desu ka?', th: 'ที่ขายตั๋วอยู่ตรงไหนคะ?', icon: '🎫' }
    ],
    general: [
      { ja: 'すみません。', romaji: 'Sumimasen', th: 'ขอโทษนะคะ / ขอทางหน่อยค่ะ', icon: '🙏' },
      { ja: 'ありがとうございます。', romaji: 'Arigatō gozaimasu', th: 'ขอบคุณมากค่ะ', icon: '💖' },
      { ja: '写真を撮ってもらえますか？', romaji: 'Shashin o totte morae masu ka?', th: 'ช่วยถ่ายรูปให้เราสองคนหน่อยได้ไหมคะ?', icon: '📸' },
      { ja: '大丈夫です。', romaji: 'Daijōbu desu', th: 'ไม่เป็นไรค่ะ / โอเคค่ะ', icon: '👌' }
    ]
  };

  return (
    <div className="cute-modal-backdrop" onClick={onClose}>
      <div className="cute-tool-card" onClick={(e) => e.stopPropagation()}>
        <div className="tool-card-header">
          <div className="tool-header-left">
            <span className="tool-emoji">🗣️🇯🇵</span>
            <h3 className="tool-title">วลีภาษาญี่ปุ่นน่ารัก ฉบับเที่ยวกับคุณแม่</h3>
          </div>
          <button className="cute-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Category Tabs */}
        <div className="phrase-category-tabs">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`phrase-tab-btn ${activeCategory === c.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Phrases List */}
        <div className="phrases-list-body">
          {phrases[activeCategory]?.map((item, idx) => (
            <div key={idx} className="phrase-item-card" onClick={() => playSpeech(item.ja)}>
              <span className="phrase-icon">{item.icon}</span>
              <div className="phrase-content">
                <div className="phrase-ja-row">
                  <span className="phrase-japanese">{item.ja}</span>
                  <button className="sound-play-btn" title="กดเพื่อฟังเสียง">
                    🔊 ฟังเสียง
                  </button>
                </div>
                <div className="phrase-romaji">{item.romaji}</div>
                <div className="phrase-thai">{item.th}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

