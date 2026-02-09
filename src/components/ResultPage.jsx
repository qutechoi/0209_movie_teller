import React from 'react';
import ChannelCard from './ChannelCard';
import { t } from '../i18n';

function ResultPage({ picks, onReset, lang }) {
  return (
    <div className="page results">
      <div className="results-topbar">
        <button className="ghost-btn" onClick={onReset}>← {t(lang, 'back')}</button>
      </div>
      <div className="container">
        <div className="results-title">{t(lang, 'results')}</div>
        <div className="grid">
          {picks.map((p) => (
            <ChannelCard key={p.channel.id} channel={p.channel} reason={p.reason} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
