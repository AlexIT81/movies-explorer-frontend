import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as mainApi from '../../utils/MainApi';
import { SHORT_FILM_MAX_DURATION } from '../../utils/constants';

export default function SavedMovies({ setErrorPopup }) {
  const [isEmptySavedMovies, setIsemptySavedMovies] = useState(true);
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);
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

  useEffect(() => {
    if (savedMoviesArr.length > 0) {
      setIsemptySavedMovies(false);
    } else {
      setIsemptySavedMovies(true);
    }

    setMoviesForShow(savedMoviesArr);
  }, [savedMoviesArr]);

  //поиск
  function handleSearch(query, short) {
    if (query && short) {
      let filteredMovies = savedMoviesArr.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(query.toLowerCase())) &&
          movie.duration <= SHORT_FILM_MAX_DURATION
      );
      setMoviesForShow(filteredMovies);
    } else if (query) {
      let filteredMovies = savedMoviesArr.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
      setMoviesForShow(filteredMovies);
    }
  }

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

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <MoviesCardList
        moviesForShow={moviesForShow}
        onRemoveSavedMovie={handleRemoveSavedMovie}
        isEmptySavedMovies={isEmptySavedMovies}
      />
    </>
  );
}
