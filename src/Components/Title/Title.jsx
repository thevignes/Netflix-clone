import React, { useEffect, useRef, useState } from 'react';

import './Title.css';
import { Link } from 'react-router-dom';

const Title = ({title,category}) => {
  const cardsRef = useRef(null);


  const[apidata,setApidata] = useState([])



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWQ3ZmQ5ZDRmNjdiNjhjN2Q1M2NlY2RkMGE3YzIwYSIsIm5iZiI6MTczODQ4MzI0Ni45ODcsInN1YiI6IjY3OWYyNjJlYWM1YTc5NTFiOWNiNjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruWc3fOBCOAHj74D9aTdP4ZzvMhp4zb-qYw7LExJwhw'
    }
  };

 

console.log(apidata,'this is the api dta')

  const handleWheel = (eve) => {
    eve.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: eve.deltaY, behavior: 'smooth' });
    }
  };

  useEffect(() => {


    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApidata(res.results))
    .catch(err => console.error(err));
    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardList) {
        cardList.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apidata.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Title;
