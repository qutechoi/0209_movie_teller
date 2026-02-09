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
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
      {/* Main Container */}
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Top App Bar */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center p-4 justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl">
                🎬
              </div>
              <div>
                <div className="text-base font-bold">{t(lang, 'title')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t(lang, 'subtitle')}</div>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  lang === 'ko'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10'
                }`}
                onClick={() => onLangChange('ko')}
              >
                한국어
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  lang === 'en'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10'
                }`}
                onClick={() => onLangChange('en')}
              >
                English
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight mb-2">
              Discover Your <span className="text-primary">Cinematic DNA</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              {t(lang, 'subtitle')}
            </p>
          </div>

          {/* Genre Selection */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              {t(lang, 'genre')}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {GENRES.map((g) => {
                const isSelected = genre === g;
                return (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`px-5 h-10 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tone Selection */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              {t(lang, 'tone')}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {TONES.map((t_val) => {
                const isSelected = tone === t_val;
                return (
                  <button
                    key={t_val}
                    onClick={() => setTone(t_val)}
                    className={`px-5 h-10 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10'
                    }`}
                  >
                    {t_val}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Spoiler Policy Selection */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              {t(lang, 'spoiler')}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {SPOILERS.map((s) => {
                const isSelected = spoilerPolicy === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => setSpoilerPolicy(s.value)}
                    className={`px-5 h-10 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Submit Button */}
          <button
            onClick={() => onSubmit({ genre, tone, spoilerPolicy, lang })}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-95 transition-all"
          >
            <span>{t(lang, 'recommend')}</span>
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
