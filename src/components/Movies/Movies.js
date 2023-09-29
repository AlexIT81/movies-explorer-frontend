import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { initialMovies } from '../../utils/constants';

export default function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  //просто чтобы было понятно что прелоадер есть и стилизован
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //при перезагрузки обновляем searchQuery если есть и короткометражки
  useEffect(() => {
    if (localStorage.searchQuery) {
      setSearchQuery(JSON.parse(localStorage.searchQuery));
    }
    if (localStorage.shortMovies) {
      setIsFilterCheckboxChecked(JSON.parse(localStorage.shortMovies));
    }
  }, []);

  //сохранить
  function handleSaveMovie(movieId) {
    let savedMoviesArr = [];
    if (localStorage.savedMovies) {
      savedMoviesArr = JSON.parse(localStorage.savedMovies);
    }
    let newMovie = initialMovies.find((item) => item._id === movieId);
    savedMoviesArr = [...savedMoviesArr, newMovie];
    localStorage.setItem('savedMovies', JSON.stringify(savedMoviesArr));
  }

  //удалить
  function handleRemoveMovie(movieId) {
    let savedMoviesArr = JSON.parse(localStorage.savedMovies);
    let newSavedMoviesArr = savedMoviesArr.filter(
      (item) => item._id !== movieId
    );
    localStorage.removeItem('savedMovies');
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesArr));
  }

  //клик по короткометражкам отправляем в другой компонент стейт
  function handleFilterCheckbox() {
    localStorage.setItem(
      'shortMovies',
      JSON.stringify(!isFilterCheckboxChecked)
    );
    setIsFilterCheckboxChecked(!isFilterCheckboxChecked);
  }

  //поиск
  function handleSearch(query) {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', JSON.stringify(query));
  }

  return (
    <>
      <SearchForm
        handleSearch={handleSearch}
        handleFilterCheckbox={handleFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          searchQuery={searchQuery}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
          movies={initialMovies}
          handleSaveMovie={handleSaveMovie}
          handleRemoveMovie={handleRemoveMovie}
        />
      )}
    </>
  );
}
