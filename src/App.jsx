import React, { useState, useEffect } from 'react';
import Search from './components/search.jsx';
import Spinner from './components/spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './superbase.js';
import ReactDOM from 'react-dom/client';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Debounce the search input
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm.trim());
  }, 1300, [searchTerm]);

  // Fetch movies from TMDB
  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setMovieList(data.results || []);

      // Save the search in Supabase if it's a query
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
        const trending = await getTrendingMovies();
        setTrendingMovies(trending);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load trending movies on mount
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img
            src="./hero1.jpg"
            alt="Hero Banner"
            style={{ filter: 'brightness(1.3) opacity(0.35)', width: '60%' }}
          />
          <h1>
            Search & Find <span className="text-gradient">Movies</span> You Love To Watch
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
        <section className='trending '>
            <h2>Most Searched</h2>

            <ul >
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />


                </li>

              ))}
            </ul>


          </section>
        )}

        <section className="all-movies">
          <h2>
            All <span className="text-gradient">Movies</span>
          </h2>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id || movie.movie_id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
