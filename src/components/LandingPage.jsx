import React, { useState } from 'react';
import { t } from '../i18n';

const GENRES = [
  '액션', '로맨스', '스릴러', '호러', '코미디', '애니메이션', '드라마', 'SF', '판타지', '다큐', '고전', '블록버스터'
];
const TONES = ['차분', '유쾌', '진지', '속도감', '지적', '감성', '분석적'];
const SPOILERS = [
  { value: 'no_spoiler', label: '결말 없이 감상(무스포)' },
  { value: 'light', label: '약한 스포일러' },
  { value: 'full', label: '결말 포함' },
];

function LandingPage({ onSubmit, lang, onLangChange }) {
  const [genre, setGenre] = useState(GENRES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [spoilerPolicy, setSpoilerPolicy] = useState(SPOILERS[0].value);

  return (
    <div className="page">
      <div className="topbar">
        <div className="brand">
          <div className="brand-badge">🎬</div>
          <div>
            <div className="brand-title">{t(lang, 'title')}</div>
            <div className="brand-sub">{t(lang, 'subtitle')}</div>
          </div>
        </div>
        <div className="lang-toggle">
          <button className={`chip ${lang === 'ko' ? 'active' : ''}`} onClick={() => onLangChange('ko')}>한국어</button>
          <button className={`chip ${lang === 'en' ? 'active' : ''}`} onClick={() => onLangChange('en')}>English</button>
        </div>
      </div>

      <main className="container">
        <div className="card">
          <div className="card-title">{t(lang, 'genre')}</div>
          <div className="chip-row">
            {GENRES.map((g) => (
              <button key={g} className={`chip ${genre === g ? 'active' : ''}`} onClick={() => setGenre(g)}>{g}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">{t(lang, 'tone')}</div>
          <div className="chip-row">
            {TONES.map((t) => (
              <button key={t} className={`chip ${tone === t ? 'active' : ''}`} onClick={() => setTone(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">{t(lang, 'spoiler')}</div>
          <div className="chip-row">
            {SPOILERS.map((s) => (
              <button key={s.value} className={`chip ${spoilerPolicy === s.value ? 'active' : ''}`} onClick={() => setSpoilerPolicy(s.value)}>{s.label}</button>
            ))}
          </div>
        </div>

        <button className="primary-btn wide" onClick={() => onSubmit({ genre, tone, spoilerPolicy, lang })}>
          {t(lang, 'recommend')}
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
