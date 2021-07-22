import React, { useEffect, useState } from "react";
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { movies$ } from './movies'
import ReactPaginate from 'react-paginate'

function App() {

  const [movies, updateMovies] = useState([])
  const [filteredMovies, updateFilteredMovies] = useState([])
  const [likes, updateLikes] = useState(false)
  const [dislikes, updateDislikes] = useState(false)
  const [pageNumber, updatePageNumber] = useState(0)

  useEffect(() => {
    handleFetchMovies()
  }, []);

  const handleFetchMovies = () => {
    movies$
      .then((result) => {
        updateMovies(result)
        updateFilteredMovies(result)
      }).catch(() => {
        console.log("a problem occured with the fetching")
      })
  }

  // Redux

  //handle delete movie 

  const handleDeleteMovie = (movieId) => {
        let filteredMovie = movies.filter((movie) => {
          return movie.id !== movieId;
        });
        updateMovies(filteredMovie);
        updateFilteredMovies(filteredMovie);
  };

  // handle toggle likes

  const handleLikes = (movieId) => {
    if (likes) {
    let clonedMovies = movies.map((movie) => {
      if (movieId == movie.id) {
        movie.likes -= 1
        return movie
      }
      else {
        return movie
      }
    });
    updateLikes(false)
    updateMovies(clonedMovies);
  } else {
    let clonedMovies = movies.map((movie) => {
      if (movieId == movie.id) {
        movie.likes += 1
        return movie
      }
      else {
        return movie
      }
    });
    updateLikes(true)
    updateMovies(clonedMovies);
  }
};

 // handle toggle dislikes

const handleDislikes = (movieId) => {
  if (dislikes) {
  let clonedMovies = movies.map((movie) => {
    if (movieId == movie.id) {
      movie.dislikes += 1
      return movie
    }
    else {
      return movie
    }
  });
  updateDislikes(false)
  updateMovies(clonedMovies);
 } else {
  let clonedMovies = movies.map((movie) => {
    if (movieId == movie.id) {
      movie.dislikes -= 1
      return movie
    }
    else {
      return movie
    }
  });
  updateDislikes(true)
  updateMovies(clonedMovies);

 }
};
  
// HANDLE FOR SEARCH
const handleSearchCategory = (e) => {
  console.log(e.target.category.value)
  let filter = e.target.category.value;
  let filteredMovies = movies.filter((movie) => {
    return movie.category.toLowerCase().includes(filter.toLowerCase());
  });
  console.log(filteredMovies)
  updateFilteredMovies(filteredMovies);
};

const handleSearchBar = (e) => {

  let input = e.target.value;
  let filteredMovies = movies.filter((movie) => {

    return movie.title.toLowerCase().includes(input.toLowerCase());
  });
  updateFilteredMovies(filteredMovies);
};

// paginate

const moviesPerPage = 4
const pagesVisited = pageNumber * moviesPerPage

const displayMovies = movies
.slice(pagesVisited, pagesVisited + moviesPerPage)
.map((movie) => {
  return (
    <div id={movie.id} className="grid-movies-item">

                  <h4>{movie.title}</h4>
                  <div className="like-container">
                    <div className="like-container-item">
                      <button >
                        <img onClick={() => { handleLikes(movie.id) }} src="../like.png" />
                      </button>
                      <h6>{movie.likes}</h6>
                    </div>
                    <div className="like-container-item">
                      <button onClick={() => { handleDislikes(movie.id) }}>
                        <img src="../dislike.png" />
                      </button>
                      <h6>{movie.dislikes}</h6>
                    </div>
                  </div>
                  <div>
                  <p>{movie.category}</p>
                  <button className="remove-btn">
                    <img onClick={() => { handleDeleteMovie(movie.id) }} src="../remove.svg" />
                  </button>
                  </div>
                  
                </div>
  );
});

const pageCount = Math.ceil(movies.length / moviesPerPage)
const changePage = ({selected}) => {
  updatePageNumber(selected);
}


  return (
    <div className="App">
      <header className="App-header">
      <h1>Tak movies</h1>
      <div className="search-container">
        <div className="searchbar">
          <input onChange={handleSearchBar} placeholder="Search your movie..."/>
        </div>
        <div className="searchCategory">
          <form onSubmit={handleSearchCategory}>
          <select name="category">
            <option value="">-Filter by category-</option>
            <option value="comedy">Comedy</option>
            <option value="animation">Animation</option>
            <option value="thriller">Thriller</option>
            <option value="drame">Drame</option>
          </select>
          <button type="submit">Filter</button>
          </form>

        </div>
      </div>
        <div className="grid-movies" >
          {displayMovies}
          
        </div>
        <ReactPaginate 
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-container"}
            previousLinkClassName={"pagination-previous"}
            nextLinkClassName={"pagination-next"}
            activeClassName={"pagination-active"}
          />
      </header>
    </div>
  );
}

export default App;
