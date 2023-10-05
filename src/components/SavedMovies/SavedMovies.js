import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as mainApi from '../../utils/MainApi';

export default function SavedMovies({ setErrorPopup }) {
  const [isEmptySavedMovies, setIsemptySavedMovies] = useState(true);
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesForShow, setMoviesForShow] = useState([]);

  useEffect(() => {
    mainApi
      .checkSavedMovies()
      .then((res) => {
        setSavedMoviesArr(res.data);
        setMoviesForShow(res.data);
        setIsemptySavedMovies(false);
      })
      .catch(() =>
        setErrorPopup('Ошибка API получения сохраненных фильмов из БД!')
      );
  }, []);

  // поиск и короткометражки сохраненных фильмов
  useEffect(() => {
    if (savedMoviesArr.length > 0) {
      setIsemptySavedMovies(false);
    } else {
      setIsemptySavedMovies(true);
    }

    if (searchQuery && isFilterCheckboxChecked) {
      let filtered = savedMoviesArr.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())) &&
          movie.duration <= 40
      );
      setMoviesForShow(filtered);
    } else if (searchQuery) {
      setSearchQuery(searchQuery.toString().trim());
      let filteredMovies = savedMoviesArr.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setMoviesForShow(filteredMovies);
    } else if (isFilterCheckboxChecked) {
      let filtered = savedMoviesArr.filter((movie) => movie.duration <= 40);
      setMoviesForShow(filtered);
    } else {
      setMoviesForShow(savedMoviesArr);
    }
  }, [savedMoviesArr, searchQuery, isFilterCheckboxChecked]);

  //удаление фильма
  function handleRemoveSavedMovie(movieId) {
    return mainApi
      .removeMovie(movieId)
      .then((res) => {
        setSavedMoviesArr(
          savedMoviesArr.filter((movie) => movie._id !== movieId)
        );
      })
      .catch(() => setErrorPopup('Ошибка API удаления фильма из БД!'));
  }

  //клик по короткометражкам
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
      <MoviesCardList
        moviesForShow={moviesForShow}
        onRemoveSavedMovie={handleRemoveSavedMovie}
        isEmptySavedMovies={isEmptySavedMovies}
      />
    </>
  );
}
