import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ResultPage from './components/ResultPage';
import channels from './data/channels.json';
import moviesData from './data/movies.json';
import { recommendChannels, validateYouTubeLinks } from './services/geminiService';
import { t } from './i18n';
import './App.css';

function App() {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState([]);
  const [lang, setLang] = useState('en');
  const [validationResults, setValidationResults] = useState(null);
  const [showValidationWarning, setShowValidationWarning] = useState(false);

  // Validate YouTube links on app start (only once)
  useEffect(() => {
    const validateLinks = async () => {
      try {
        console.log('🔍 Starting YouTube link validation...');
        const results = await validateYouTubeLinks(channels);
        setValidationResults(results);

        console.log('✅ Validation complete:', results.summary);

        // Log suspicious or invalid channels
        const problematic = results.validatedChannels.filter(
          c => c.status === 'suspicious' || c.status === 'invalid'
        );

        if (problematic.length > 0) {
          console.warn('⚠️ Problematic channels found:');
          problematic.forEach(c => {
            console.warn(`  - ${c.name} (${c.id})`);
            console.warn(`    Current URL: ${c.url}`);
            console.warn(`    Status: ${c.status} (confidence: ${c.confidence})`);
            console.warn(`    Reason: ${c.reason}`);
            if (c.suggestedUrl) {
              console.warn(`    Suggested URL: ${c.suggestedUrl}`);
            }
          });
          setShowValidationWarning(true);
        } else {
          console.log('✅ All channel URLs look correct!');
        }
      } catch (error) {
        console.error('❌ Link validation failed:', error.message);
        // Don't block the app if validation fails
      }
    };

    validateLinks();
  }, []);

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

      // Check if any recommended channels have validation issues
      if (validationResults) {
        const recommendedIds = mapped.map(m => m.channel.id);
        const problematicRecommended = validationResults.validatedChannels.filter(
          c => recommendedIds.includes(c.id) && (c.status === 'suspicious' || c.status === 'invalid')
        );

        if (problematicRecommended.length > 0) {
          console.warn('⚠️ Some recommended channels have URL issues:');
          problematicRecommended.forEach(c => {
            console.warn(`  - ${c.name}: ${c.reason}`);
          });
        }
      }

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

  return (
    <>
      {/* Validation Warning Banner */}
      {showValidationWarning && (
        <div className="fixed top-4 right-4 z-50 max-w-md p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-yellow-500 text-xl">warning</span>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-yellow-500 mb-1">
                YouTube Link Issues Detected
              </h4>
              <p className="text-xs text-slate-300 mb-2">
                Some channel URLs may be incorrect. Check the browser console for details.
              </p>
              <button
                onClick={() => setShowValidationWarning(false)}
                className="text-xs text-yellow-500 hover:text-yellow-400 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'form' ? (
        <LandingPage onSubmit={handleSubmit} lang={lang} onLangChange={setLang} />
      ) : (
        <ResultPage picks={picks} onReset={handleReset} lang={lang} />
      )}
    </>
  );
}

export default App;
