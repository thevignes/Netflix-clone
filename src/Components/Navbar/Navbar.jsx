import React, { useEffect, useRef, useState } from 'react';
import Logo from "../../assets/logo.png";
import SearchIcon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import Profileimg from "../../assets/profile_img.png";
import DropdownIcon from "../../assets/caret_icon.svg";
import './Navbar.css';
import { logout } from '../../firebase';

const Navbar = ({ onSearchResults }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navref = useRef();
  const searchInputRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWQ3ZmQ5ZDRmNjdiNjhjN2Q1M2NlY2RkMGE3YzIwYSIsIm5iZiI6MTczODQ4MzI0Ni45ODcsInN1YiI6IjY3OWYyNjJlYWM1YTc5NTFiOWNiNjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruWc3fOBCOAHj74D9aTdP4ZzvMhp4zb-qYw7LExJwhw'
    }
  };

  // Effect for fetching search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!search) {
        onSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&include_adult=false&language=en-US&page=1`,
          options
        );
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Full API Response:', data);

        if (!data) {
          throw new Error('No data received from API');
        }

        if (!data.results) {
          throw new Error('No results property in API response');
        }

        console.log(`Found ${data.results.length} movies`);
        onSearchResults(data.results);
        
      } catch (error) {
        console.error('Detailed error:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        onSearchResults([]);
      } finally {
        setLoading(false);
      }
    };


    const timeoutId = setTimeout(() => {
      if (showSearch) {
        fetchSearchResults();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [search, showSearch, onSearchResults]); // Dependencies for the effect

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navref.current.classList.add('nav-dark');
      } else {
        navref.current.classList.remove('nav-dark');
      }
    });
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchIconClick = () => {
    setShowSearch(prevState => !prevState);
    if (!showSearch) {
      setSearch("");
      onSearchResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is now handled automatically by the useEffect
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Input changed to:', value);
    setSearch(value);
  };

  return (
    <div className='navbar' ref={navref}>
      <div className="navbar-left">
        <img className='logopng' src={Logo} alt="" />
      </div>
      <div className="navbar-right">
        <ul className='Nav-right'>
          <ul>Home</ul>
          <ul>Tv Shows</ul>
          <ul>Movies</ul>
          <ul>New & Popular</ul>
          <ul>My list</ul>
          <ul>Browse by Languages</ul>
        </ul>
      </div>

      <div className="navbar-icons">
        <div className="search-wrapper">
          {showSearch && (
            <form onSubmit={handleSearch} className="search-form">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for movies..."
                value={search}
                onChange={handleInputChange}
                className="search-input"
              />
              <button type="submit" className="search-submit" disabled={loading}>
                {loading ? '...' : <img src={SearchIcon} alt="Search" />}
              </button>
            </form>
          )}
          {!showSearch && (
            <img 
              src={SearchIcon} 
              alt="" 
              className='icon' 
              onClick={handleSearchIconClick}
            />
          )}
        </div>
        <img src={bell_icon} alt="" className='icon' />
        <div className="navbar-profile-pic">
          <div className="navbar-profile">
            <img src={Profileimg} alt="" className='profile' />
            <img src={DropdownIcon} alt="" className='dropdown-icon' />
          </div>
          <div className='navbar dropdown'>
       
            <p onClick={() => logout()}>Sign Out</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;