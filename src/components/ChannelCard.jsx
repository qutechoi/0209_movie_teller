import React from 'react';

function ChannelCard({ channel, reason }) {
  return (
    <div className="card channel">
      <div className="channel-head">
        <div>
          <div className="channel-name">{channel.name}</div>
          <div className="channel-summary">{channel.summary}</div>
        </div>
        <a className="chip" href={channel.url} target="_blank" rel="noreferrer">YouTube</a>
      </div>
      <div className="tag-row">
        {channel.genres?.map((g) => <span key={g} className="tag">{g}</span>)}
        {channel.tone?.map((t) => <span key={t} className="tag ghost">{t}</span>)}
      </div>
      {reason && <div className="reason">추천 이유: {reason}</div>}
    </div>
  );
}

export default ChannelCard;
