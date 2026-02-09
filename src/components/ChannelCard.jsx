import React from 'react';
import { t } from '../i18n';

function ChannelCard({ channel, reason, lang, validationStatus }) {
  const showWarning = validationStatus === 'suspicious' || validationStatus === 'invalid';

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
      {/* Warning Banner */}
      {showWarning && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <span className="material-symbols-outlined text-yellow-500 text-lg">warning</span>
          <span className="text-xs text-yellow-400">
            {lang === 'ko' ? 'URL이 자동 수정되었습니다' : 'URL was auto-corrected'}
          </span>
        </div>
      )}

      {/* Header: Name + YouTube button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold truncate">{channel.name}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{channel.summary}</p>
        </div>
        <a
          href={channel.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 shrink-0 px-4 h-9 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          YouTube
        </a>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {channel.genres?.map((g) => (
          <span
            key={g}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary"
          >
            {g}
          </span>
        ))}
        {channel.tone?.map((tn) => (
          <span
            key={tn}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10"
          >
            {tn}
          </span>
        ))}
      </div>

      {/* Recommendation Reason */}
      {reason && (
        <>
          <div className="border-t border-white/5" />
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">auto_awesome</span>
            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-200">{t(lang, 'reason')}: </span>
              {reason}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ChannelCard;
