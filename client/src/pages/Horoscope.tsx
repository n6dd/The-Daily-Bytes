import React, { useState, useEffect } from 'react';
import './Horoscope.css';

// ==========================
// Types
// ==========================
interface HoroscopeData {
  text: string;
  luckyNumber: number;
  mood: string;
}

interface HoroscopeCollection {
  [key: string]: HoroscopeData;
}

// ==========================
// Component: Horoscope
// ==========================
const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [currentDate, setCurrentDate] = useState('');
  const [horoscope, setHoroscope] = useState<HoroscopeData>({
    text: '',
    luckyNumber: 0,
    mood: ''
  });

  // ==========================
  // Horoscope Data (Static)
  // ==========================
  const horoscopes: HoroscopeCollection = {
    aries: { text: "Today is a day for new beginnings...", luckyNumber: 7, mood: "Adventurous" },
    taurus: { text: "Financial matters may require your attention...", luckyNumber: 4, mood: "Determined" },
    gemini: { text: "Communication is highlighted today...", luckyNumber: 11, mood: "Curious" },
    cancer: { text: "Focus on home and family matters...", luckyNumber: 2, mood: "Nurturing" },
    leo: { text: "Your creative energy is at a peak today...", luckyNumber: 9, mood: "Passionate" },
    virgo: { text: "Organization is key today...", luckyNumber: 5, mood: "Analytical" },
    libra: { text: "Relationships are in focus today...", luckyNumber: 6, mood: "Diplomatic" },
    scorpio: { text: "Deep emotions may surface today...", luckyNumber: 13, mood: "Intense" },
    sagittarius: { text: "Adventure calls today...", luckyNumber: 3, mood: "Optimistic" },
    capricorn: { text: "Career matters take center stage...", luckyNumber: 8, mood: "Ambitious" },
    aquarius: { text: "Innovative ideas flow today...", luckyNumber: 22, mood: "Inventive" },
    pisces: { text: "Your compassionate nature shines today...", luckyNumber: 12, mood: "Dreamy" }
  };

  // ==========================
  // Lifecycle
  // ==========================
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
    updateHoroscope(selectedSign);
  }, [selectedSign]);

  // ==========================
  // Helpers
  // ==========================
  const updateHoroscope = (sign: string) => {
    setHoroscope(horoscopes[sign]);
  };

  const handleSignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSign(e.target.value);
  };

  const getSignName = () => {
    const select = document.getElementById('zodiac-sign') as HTMLSelectElement;
    return select?.options[select.selectedIndex]?.text.split(' ')[0] || '';
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="horoscope-container">
      <div className="horoscope-section">
        <div className="horoscope-header">
          <h2>Daily Horoscope</h2>
          <div className="date-display">{currentDate}</div>
        </div>

        <select
          className="zodiac-selector"
          id="zodiac-sign"
          value={selectedSign}
          onChange={handleSignChange}
        >
          <option value="aries">Aries (Mar 21 - Apr 19)</option>
          <option value="taurus">Taurus (Apr 20 - May 20)</option>
          <option value="gemini">Gemini (May 21 - Jun 20)</option>
          <option value="cancer">Cancer (Jun 21 - Jul 22)</option>
          <option value="leo">Leo (Jul 23 - Aug 22)</option>
          <option value="virgo">Virgo (Aug 23 - Sep 22)</option>
          <option value="libra">Libra (Sep 23 - Oct 22)</option>
          <option value="scorpio">Scorpio (Oct 23 - Nov 21)</option>
          <option value="sagittarius">Sagittarius (Nov 22 - Dec 21)</option>
          <option value="capricorn">Capricorn (Dec 22 - Jan 19)</option>
          <option value="aquarius">Aquarius (Jan 20 - Feb 18)</option>
          <option value="pisces">Pisces (Feb 19 - Mar 20)</option>
        </select>

        <div className="horoscope-content">
          <h3 className="horoscope-title">{getSignName()}</h3>
          <p className="horoscope-text">{horoscope.text}</p>

          <div className="horoscope-details">
            <div className="lucky-number">
              Lucky Number<br />
              <span>{horoscope.luckyNumber}</span>
            </div>
            <div className="mood">
              Mood<br />
              <span>{horoscope.mood}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horoscope;
