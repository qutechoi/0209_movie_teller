import React, { useState } from 'react';
import moviesData from '../data/movies.json';

const GENRES = [
  'Sci-Fi', 'Noir', 'Indie', 'Blockbuster', 'Psychological', '90s Nostalgia', 'Thriller'
];

function LandingPage({ onSubmit, lang, onLangChange }) {
  const [selectedGenres, setSelectedGenres] = useState(['Sci-Fi', 'Psychological']);
  const [selectedMovies, setSelectedMovies] = useState(['movie-1', 'movie-4']);
  const minSelections = 5;

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleMovie = (movieId) => {
    setSelectedMovies(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const handleSubmit = () => {
    const totalSelected = selectedMovies.length;
    if (totalSelected < minSelections) {
      alert(`Please select at least ${minSelections} movies or genres`);
      return;
    }
    onSubmit({
      selectedMovies,
      selectedGenres,
      lang
    });
  };

  const progress = Math.min(100, (selectedMovies.length / minSelections) * 100);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased">
      {/* Main Container */}
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32">
        {/* Top App Bar */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="flex items-center p-4 justify-between">
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
            </button>
            <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
              Onboarding
            </h2>
          </div>

          {/* Progress Section */}
          <div className="flex flex-col gap-2 px-6 pb-4">
            <div className="flex justify-between items-end">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                Step 2 of 5
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {Math.round(progress)}% Complete
              </p>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex flex-col px-6 pt-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight mb-2">
              Discover Your <span className="text-primary">Cinematic DNA</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Select at least {minSelections} movies or genres you love to help our AI find your perfect match.
            </p>
          </div>

          {/* Genre Tags Cloud */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Popular Genres
              </h3>
              <span className="text-xs text-primary font-medium">View All</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {GENRES.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all ${
                      isSelected
                        ? 'bg-primary shadow-lg shadow-primary/20'
                        : 'bg-slate-200 dark:bg-white/5 border border-transparent dark:border-white/10'
                    }`}
                  >
                    <span
                      className={`text-sm font-${isSelected ? 'semibold' : 'medium'} ${
                        isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {genre}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Movie Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Suggested For You
              </h3>
              <div className="flex items-center text-primary text-sm font-medium">
                <span className="material-symbols-outlined text-lg mr-1">search</span>
                Search
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {moviesData.map((movie) => {
                const isSelected = selectedMovies.includes(movie.id);
                return (
                  <div key={movie.id} className="relative group cursor-pointer" onClick={() => toggleMovie(movie.id)}>
                    <div
                      className={`aspect-[2/3] w-full overflow-hidden rounded-xl transition-all ${
                        isSelected
                          ? 'border-2 border-primary ring-4 ring-primary/20'
                          : 'border-2 border-transparent hover:border-white/20'
                      }`}
                    >
                      <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={movie.posterUrl}
                        alt={movie.altText}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-white">
                          <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-bold truncate">{movie.title}</h4>
                      <p className="text-xs text-slate-500">
                        {movie.year} • {movie.genre}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Add More Card */}
              <div className="relative group cursor-pointer">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-xl border-2 border-transparent hover:border-white/20 transition-all">
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10">
                    <span className="material-symbols-outlined text-4xl text-slate-400">add_circle</span>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-bold truncate">Find More</h4>
                  <p className="text-xs text-slate-500">Search library</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Action Bar (Floating) */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light dark:from-background-dark dark:via-background-dark/95 to-transparent pt-12">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  genetics
                </span>
                <span className="text-xs font-bold text-primary uppercase tracking-tight">
                  {selectedMovies.length} / {minSelections} Selected
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={selectedMovies.length < minSelections}
              className={`w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-95 transition-all ${
                selectedMovies.length < minSelections ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>Analyze My Taste</span>
              <span className="material-symbols-outlined">auto_awesome</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
