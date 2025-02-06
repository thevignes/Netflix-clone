import { useNavigate, useParams } from 'react-router-dom'
import Backarrow from '../../assets/back_arrow_icon.png'
import './Player.css'
import React, { useEffect, useState } from 'react'

const Player = () => {
const {id} = useParams()
    const [apidata , setApidata]  = useState({
        name:"",
        key:"",
        published_at:"",
        typeof:""

    })      


    const navigate = useNavigate()


    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWQ3ZmQ5ZDRmNjdiNjhjN2Q1M2NlY2RkMGE3YzIwYSIsIm5iZiI6MTczODQ4MzI0Ni45ODcsInN1YiI6IjY3OWYyNjJlYWM1YTc5NTFiOWNiNjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruWc3fOBCOAHj74D9aTdP4ZzvMhp4zb-qYw7LExJwhw'
        }
      };
      
   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApidata(res.results[0]))
    .catch(err => console.error(err));

   })


  return (
    <div className='player'>
      <img src= {Backarrow} alt="" onClick={()=> {navigate(-2)}} />
      <iframe src={`https://www.youtube.com/embed/${apidata.key}`} allowFullScreen width='90%' height='90%'  title='Trailer' frameborder="0"></iframe>
      <div className='player-info'>
        <p>{apidata.published_at}</p>
        <p>{apidata.name}</p>
        <p>{apidata.typeof}</p>
      </div>
    </div>
  )
}

export default Player
