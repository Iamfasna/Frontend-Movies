import React, { useState, useEffect, useContext } from 'react';
import FavHeader from '../components/FavHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../style/Favourites.css';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Favourites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredFavorites(favorites);
    } else {
      setFilteredFavorites(
        favorites.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <FavHeader onSearch={handleSearch} />
      <div className='head'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
        </Link>
        <h2>My Favourites</h2>
        <div className='search-box'>
          <FontAwesomeIcon icon={faSearch} className='searchicon' />
          <input
            className='search-fav'
            placeholder='Search from Favourites'
            value={searchQuery} //
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className='favorites-container'>
        {filteredFavorites.map((movie) => (
          <div key={movie.id} className='favorite-item'>
            <img src={movie.banner_image} alt={movie.title} />
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => removeFavorite(movie)}
              style={{ color: 'red' }}
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

export default Favourites;
