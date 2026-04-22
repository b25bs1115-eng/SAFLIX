import React, { useState, useEffect } from 'react';
import { 
  Play, Info, Search, Bell, Plus, Check, User, X, 
  ThumbsUp, Star, TrendingUp, Sparkles, Film, BrainCircuit 
} from 'lucide-react';

const OMDB_API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=c0c80965"; // Replace with your actual OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

const SEED_TITLES = {
  trending: ["Stranger Things", "Wednesday", "The Crown", "Money Heist", "Dark"],
  originals: ["Squid Game", "Bridgerton", "Black Mirror", "Mindhunter", "Narcos"],
  movies: ["Inception", "Interstellar", "The Dark Knight", "Pulp Fiction", "The Matrix"]
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Flatten all titles to fetch
        const allTitles = [...SEED_TITLES.trending, ...SEED_TITLES.originals, ...SEED_TITLES.movies];
        const movieData = await Promise.all(
          allTitles.map(async (title) => {
            const response = await fetch(`${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
            return response.json();
          })
        );
        setMovies(movieData.filter(m => m.Response === "True"));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-red-600" size={40} />
          <h1 className="text-4xl font-extrabold tracking-tighter text-red-600">SAFLIX</h1>
        </div>
        <div className="flex items-center gap-6">
          <Search size={24} className="cursor-pointer hover:text-gray-400" />
          <Bell size={24} className="cursor-pointer hover:text-gray-400" />
          <User size={24} className="cursor-pointer hover:text-gray-400" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12 relative h-96 rounded-xl overflow-hidden bg-gradient-to-r from-zinc-900 to-transparent flex items-center p-12">
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-2 mb-4 text-yellow-500">
            <Sparkles size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">AI Recommendation Choice</span>
          </div>
          <h2 className="text-6xl font-black mb-4">Interstellar</h2>
          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            Using Bayes' Theorem to analyze your interaction patterns, our engine suggests this sci-fi masterpiece.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition">
              <Play fill="black" /> Play
            </button>
            <button className="flex items-center gap-2 bg-zinc-700/80 text-white px-8 py-3 rounded font-bold hover:bg-zinc-600 transition">
              <Info /> More Info
            </button>
          </div>
        </div>
      </section>

      {/* Movie Grid Section */}
      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} className="text-red-500" />
            <h3 className="text-2xl font-bold">Trending Now</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading ? <p>Loading recommendations...</p> : movies.map((movie) => (
              <div key={movie.imdbID} className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
                <img src={movie.Poster} alt={movie.Title} className="rounded-md w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="font-bold text-sm mb-2">{movie.Title}</p>
                  <div className="flex gap-2">
                    <Plus size={18} className="p-1 bg-zinc-800 rounded-full" />
                    <ThumbsUp size={18} className="p-1 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
