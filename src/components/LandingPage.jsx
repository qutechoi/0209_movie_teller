import React, { useState } from 'react';

const GENRES = [
  '액션', '로맨스', '스릴러', '호러', '코미디', '애니메이션', '드라마', 'SF', '판타지', '다큐', '고전', '블록버스터'
];
const TONES = ['차분', '유쾌', '진지', '속도감', '지적', '감성', '분석적'];
const SPOILERS = [
  { value: 'no_spoiler', label: '결말 없이 감상(무스포)' },
  { value: 'light', label: '약한 스포일러' },
  { value: 'full', label: '결말 포함' },
];
const LANGS = [
  { value: 'all', label: '전체' },
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어권' },
];

function LandingPage({ onSubmit }) {
  const [genre, setGenre] = useState(GENRES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [spoilerPolicy, setSpoilerPolicy] = useState(SPOILERS[0].value);
  const [lang, setLang] = useState('all');

  return (
    <div className="page">
      <div className="topbar">
        <div className="brand">
          <div className="brand-badge">🎬</div>
          <div>
            <div className="brand-title">Movie Channel Finder</div>
            <div className="brand-sub">선호 취향에 맞는 리뷰 채널 추천</div>
          </div>
        </div>
      </div>

      <main className="container">
        <div className="card">
          <div className="card-title">장르</div>
          <div className="chip-row">
            {GENRES.map((g) => (
              <button key={g} className={`chip ${genre === g ? 'active' : ''}`} onClick={() => setGenre(g)}>{g}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">목소리 톤</div>
          <div className="chip-row">
            {TONES.map((t) => (
              <button key={t} className={`chip ${tone === t ? 'active' : ''}`} onClick={() => setTone(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">결말 유무</div>
          <div className="chip-row">
            {SPOILERS.map((s) => (
              <button key={s.value} className={`chip ${spoilerPolicy === s.value ? 'active' : ''}`} onClick={() => setSpoilerPolicy(s.value)}>{s.label}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">언어권</div>
          <div className="chip-row">
            {LANGS.map((l) => (
              <button key={l.value} className={`chip ${lang === l.value ? 'active' : ''}`} onClick={() => setLang(l.value)}>{l.label}</button>
            ))}
          </div>
        </div>

        <button className="primary-btn wide" onClick={() => onSubmit({ genre, tone, spoilerPolicy, lang })}>
          추천받기
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
