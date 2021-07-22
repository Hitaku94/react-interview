import React, { useEffect, useState } from "react";
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {increment} from './actions';
import {decrement} from './actions';
import {movies$} from './movies'

function App() {

  const [movies, updateMovies] = useState([])

  useEffect(() => {
    handleFetchMovies()
  },[]);

  const handleFetchMovies = () => {
    movies$
    .then((result) => {
      updateMovies(result)
    }).catch(() => {
      console.log("a problem occured with the fetching")
    })
  }

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter {counter}</h1>
        <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <div className="grid-movies" >
      {
        movies.map((movie) => {
          return (
          
            <div id={movie.id} className="grid-movies-item">
            <h4>{movie.title}</h4>
            <h6>{movie.likes}</h6>
            <h6>{movie.dislikes}</h6>
            <button>Delete</button>
            </div>
          
          )
        })
      }
      </div>
      </header>
    </div>
  );
}

export default App;
