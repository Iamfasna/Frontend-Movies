import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../style/movies.css';
import banner from '../images/spiderman.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../context/FavoritesContext';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${query}`);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className='body'>
      <Header onSearch={handleSearch} />
      <div className='main'>
        <img src={banner} alt='banner' />
      </div>
      <div className='each'>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className='movie-item'>
            <img src={movie.banner_image} alt={movie.title} />
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => toggleFavorite(movie)}
              style={{ color: favorites.some((fav) => fav.id === movie.id) ? 'red' : 'black' }}
            />
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
