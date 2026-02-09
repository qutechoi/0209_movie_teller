import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultPage from './components/ResultPage';
import channels from './data/channels.json';
import { recommendChannels } from './services/geminiService';
import { t } from './i18n';
import './App.css';

function App() {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState([]);
  const [lang, setLang] = useState('ko');

  const handleSubmit = async (prefs) => {
    setLoading(true);
    try {
      const result = await recommendChannels({ ...prefs, channels, lang });
      const mapped = (result.picks || []).map((p) => ({
        channel: channels.find((c) => c.id === p.id),
        reason: p.reason,
      })).filter((p) => p.channel);
      setPicks(mapped);
      setStep('result');
    } catch (e) {
      alert(e.message || '추천 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setPicks([]);
  };

  if (loading) {
    return (
      <div className="page loading">
        <div className="loading-card">{t(lang, 'loading')}</div>
      </div>
    );
  }

  return step === 'form' ? (
    <LandingPage onSubmit={handleSubmit} lang={lang} onLangChange={setLang} />
  ) : (
    <ResultPage picks={picks} onReset={handleReset} lang={lang} />
  );
}

export default App;
