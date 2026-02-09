import React from 'react';
import { t } from '../i18n';

function ChannelCard({ channel, reason, lang }) {
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
      {reason && <div className="reason">{t(lang, 'reason')}: {reason}</div>}
    </div>
  );
}

export default ChannelCard;
