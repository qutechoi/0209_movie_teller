import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultPage from './components/ResultPage';
import channels from './data/channels.json';
import moviesData from './data/movies.json';
import { recommendChannels } from './services/geminiService';
import { t } from './i18n';
import './App.css';

function App() {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState([]);
  const [lang, setLang] = useState('en');

  const handleSubmit = async (prefs) => {
    setLoading(true);
    try {
      // Convert movie selections to preference data
      const selectedMovieObjects = prefs.selectedMovies
        .map(id => moviesData.find(m => m.id === id))
        .filter(Boolean);

      const genres = [...new Set([
        ...prefs.selectedGenres,
        ...selectedMovieObjects.map(m => m.genre)
      ])].join(', ');

      // Use the first selected genre or movie genre for recommendation
      const primaryGenre = prefs.selectedGenres[0] || selectedMovieObjects[0]?.genre || 'Sci-Fi';

      const result = await recommendChannels({
        genre: primaryGenre,
        tone: 'analytical',
        spoilerPolicy: 'no_spoiler',
        selectedMovies: selectedMovieObjects,
        selectedGenres: prefs.selectedGenres,
        channels,
        lang: prefs.lang
      });

      const mapped = (result.picks || []).map((p) => ({
        channel: channels.find((c) => c.id === p.id),
        reason: p.reason,
      })).filter((p) => p.channel);

      setPicks(mapped);
      setStep('result');
    } catch (e) {
      alert(e.message || 'Error occurred during recommendation.');
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
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="px-8 py-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-white font-medium">{t(lang, 'loading') || 'Loading...'}</span>
          </div>
        </div>
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
