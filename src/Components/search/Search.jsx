import React, { useState } from 'react';
import './search.css';

const Search = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = '9ed7fd9d4f67b68c7d53cecdd0a7c20a'; // Replace with your TMDB API key
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  const searchMovies = async (query) => {
    if (!query) {
      onSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      onSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(search);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      onSearchResults([]); // Clear results when search is empty
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit" aria-label="Search" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default Search;