import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./Home.css"
import HeroImage from '../../assets/hero_banner.jpg'
import HeroTitle from '../../assets/hero_title.png'
import PlayButton from '../../assets/play_icon.png'
import InfoIcon from '../../assets/info_icon.png'
import Title from '../../Components/Title/Title'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    console.log('Home received search results:', results);
    setSearchResults(results);
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className='home'>
      <Navbar onSearchResults={handleSearchResults} />
      
      {searchResults.length === 0 ? (
        <>
          <div className='hero'>
            <img src={HeroImage} alt="" className='banner-img' />
            <div className='hero-caption'>
              <img src={HeroTitle} alt="" className='caption-img' />
              <p>Bound by fate, he uncovers an ancient secret. A forgotten prophecy, a rising war—one hero must fight to rewrite history before time runs out</p>
              <div className='hero-btns'>
                <button className='btn'><img src={PlayButton} alt="" />play</button>
                <button className='btn dark-btn'><img src={InfoIcon} alt="" />More Info</button>
              </div>
              <Title />
            </div>
          </div>
          <div className="more-cards">
            <Title title={'Ultimate Movie Night'} category={'popular'} />
            <Title title={'Must-Watch Movies'} category={'top_rated'} />
            <Title title={'Chart-Topping Movies'} category={'upcoming'} />
          </div>
        </>
      ) : (
        <div className="search-results-container">
          <h2>Search Results ({searchResults.length} movies found)</h2>
          <div className="movies-grid">
            {searchResults.map((movie) => (
              <Link to={`/player/${movie.id}`} key={movie.id} className="movie-card">
                <img
                  src={getImageUrl(movie.backdrop_path || movie.poster_path)}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                  }}
                />
                <h3>{movie.title}</h3>
                <p className="movie-year">{movie.release_date?.split('-')[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
