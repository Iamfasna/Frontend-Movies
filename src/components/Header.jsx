import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

function Header({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className='outer-div' style={{ backgroundColor: 'beige' }}>
      <div className='first'>
        <FontAwesomeIcon icon={faClapperboard} style={{ color: '#e41b1b', marginTop: '20px', marginRight: '20px' }} size="2x" />
        <h3>GET MOVIES</h3>
        <div className='search-box'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input
            className='search'
            placeholder='Search movies and series'
            onChange={handleInputChange}
          />
        </div>
      </div >
      <Link to="/favourite" className='second'>My Favourites</Link>
    </div >
  );
}

export default Header;
