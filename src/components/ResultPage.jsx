import React from 'react';
import ChannelCard from './ChannelCard';
import { t } from '../i18n';

function ResultPage({ picks, onReset, lang, onLangChange }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Top App Bar */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center p-4 justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight">
              {t(lang, 'results')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {picks.length} {lang === 'ko' ? '개 채널' : picks.length === 1 ? 'channel' : 'channels'}
            </p>
          </div>

          {/* Channel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {picks.map((p) => (
              <ChannelCard
                key={p.channel.id}
                channel={p.channel}
                reason={p.reason}
                lang={lang}
                validationStatus={p.validationStatus}
              />
            ))}
          </div>

          {/* Reset Button */}
          <div className="mt-8">
            <button
              onClick={onReset}
              className="w-full h-14 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>{lang === 'ko' ? '다시 설정' : 'Start over'}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ResultPage;
