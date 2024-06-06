import React from 'react';
import './App.css';
import Movies from './page/movies';
import Favourites from './page/favourites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext'; // Import the FavoritesProvider

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/favourite" element={<Favourites />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
