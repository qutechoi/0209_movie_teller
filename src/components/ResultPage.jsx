import React from 'react';
import ChannelCard from './ChannelCard';

function ResultPage({ picks, onReset }) {
  return (
    <div className="page results">
      <div className="results-topbar">
        <button className="ghost-btn" onClick={onReset}>← Back</button>
      </div>
      <div className="container">
        <div className="results-title">추천 채널</div>
        <div className="grid">
          {picks.map((p) => (
            <ChannelCard key={p.channel.id} channel={p.channel} reason={p.reason} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
