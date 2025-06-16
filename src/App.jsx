import React, { useState, useEffect } from 'react'
import Search from './components/search.jsx'
import Spinner from './components/spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'
const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);// Initialize movies state with a loading message
  const [loading, setLoading] = useState(false);// Initialize loading state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  // Use the useDebounce hook to debounce the search term
  useDebounce(() =>
    setDebouncedSearchTerm(searchTerm),
    1300, [searchTerm]);

  // Fetch popular movies from the API
  const fetchmovies = async (query = '') => {
    setLoading(true);
    setErrorMessage(null);// Set loading to true before fetching
    try {

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}?`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc}`;// Construct the API endpoint URL
      const response = await fetch(endpoint, API_OPTIONS);// Make the API request
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();// Parse the JSON response

      // console.log(data);// Log the data for debugging

      if (data.response === 'false') {
        setErrorMessage(data.error || 'No movies found. Please try a different search term.');
        setMovieList([]);// Clear the movie list if no movies are found
        return;
      }
      setMovieList(data.results || []);// Update the movie list with the fetched results
      setErrorMessage(null);// Clear any previous error messages
      if (query && data.results.length > 0) { await updateSearchCount(query, data.results[0]) }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');

    } finally {
      setLoading(false);// Set loading to false after fetching
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies:${error}`);
    }
  };


  useEffect(() => {
    // Call the fetchmovies function when the component mounts
    fetchmovies(debouncedSearchTerm);
  }
    , [debouncedSearchTerm])

  useEffect(() => {
    // Call the loadTrendingMovies function when the component mounts
    loadTrendingMovies();
  }, []);


  // Render the main layout with header and search component
  return (
    <main>
      <div className="pattern" />


      <div className="wrapper">
        <header>
          <img src="./hero1.jpg" alt="Hero Banner" style={{ filter: "brightness(1.3) opacity(0.35)", width: "60%", }}></img>
          <h1>Search & Find <span className="text-gradient">Movies</span>  You Love To Watch</h1>
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
<<<<<<< HEAD
        <section className="all-movies">
          <h2 >All <span className="text-gradient ">Movies</span> </h2>
=======

          <h2 >Popular <span className="text-gradient ">Movies</span> </h2>
>>>>>>> af68eb9e28e91efd8bcf4f2af8b33f12ad5bfa50
          {loading ? (
            <Spinner />
          )
            : errorMessage ? (
              <p className="text-white">{errorMessage}</p>)
              : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />

                  ))}
                </ul>
              )}
        </section>


      </div>
    </main>
  )
}

export default App 
