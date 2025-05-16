import React, { useState, useEffect } from 'react';
import './Horoscope.css';

interface HoroscopeData {
  text: string;
  lucky_number: string;
  mood: string;
}

const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [currentDate, setCurrentDate] = useState('');
  const [horoscope, setHoroscope] = useState<HoroscopeData>({
    text: '',
    lucky_number: '',
    mood: ''
  });

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));

    fetchHoroscope(selectedSign);
  }, [selectedSign]);

  const fetchHoroscope = async (sign: string) => {
    try {
      const res = await fetch(`/api/horoscope/${sign}`);
      const data = await res.json();
      setHoroscope({
        text: data.description,
        lucky_number: data.lucky_number,
        mood: data.mood
      });
    } catch (err) {
      console.error("Failed to fetch horoscope:", err);
    }
  };

  const handleSignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSign(e.target.value);
  };

  const getSignName = () => {
    const select = document.getElementById('zodiac-sign') as HTMLSelectElement;
    return select?.options[select.selectedIndex]?.text.split(' ')[0] || '';
  };

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
              <span>{horoscope.lucky_number}</span>
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
