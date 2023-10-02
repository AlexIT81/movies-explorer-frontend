import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { initialMovies } from '../../utils/constants'; // потом удалить

export default function SavedMovies() {
  const [isEmptySavedMovies, setIsemptySavedMovies] = useState(true);
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (localStorage.savedMovies) {
      setSavedMoviesArr(JSON.parse(localStorage.savedMovies));
      setIsemptySavedMovies(false);
    } else {
      setSavedMoviesArr([]);
      setIsemptySavedMovies(true);
    }
  }, []);

  function handleRemoveMovie(movieId) {
    let savedMoviesArr = JSON.parse(localStorage.savedMovies);
    let newSavedMoviesArr = savedMoviesArr.filter(
      (item) => item._id !== movieId
    );
    localStorage.removeItem('savedMovies');
    setSavedMoviesArr(newSavedMoviesArr);
    if (newSavedMoviesArr.length > 0) {
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesArr));
    } else {
      setSavedMoviesArr([]);
      setIsemptySavedMovies(true);
    }
  }

  //клик по короткометражкам отправляем в другой компонент стейт
  function handleFilterCheckbox() {
    setIsFilterCheckboxChecked(!isFilterCheckboxChecked);
  }

  //поиск
  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <>
      <SearchForm
        onSearch={handleSearch}
        onFilterCheckbox={handleFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
      />
      {/* {isLoading ? <Preloader /> : <MoviesCardList movies={savedMoviesArr} isEmptySavedMovies={isEmptySavedMovies} handleRemoveMovie={handleRemoveMovie} />} */}
      {!isEmptySavedMovies ? (
        <MoviesCardList
          searchQuery={searchQuery}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
          movies={savedMoviesArr}
          handleRemoveMovie={handleRemoveMovie}
        />
      ) : (
        <section className='movies-card-list'>
          <h1 className='movies-card-list__empty-search'>
            Нету сохраненных фильмов!
          </h1>
        </section>
      )}
    </>
  );
}
