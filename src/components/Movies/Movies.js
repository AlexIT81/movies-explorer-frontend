import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
  FULL_SCREEN_DATA,
  MEDIUM_SCREEN_DATA,
  SMALL_SCREEN_DATA,
  SHORT_FILM_MAX_DURATION
} from '../../utils/constants';
import useWindowSize from '../hooks/useWindowSize';
import * as mainApi from '../../utils/MainApi';
import { API_IMAGE_URL } from '../../utils/constants';

export default function Movies({
  movies,
  isLoading,
  beatfilmApiError,
  setErrorPopup,
}) {
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);

  const windowWidth = useWindowSize();
  const [moviesForShow, setMoviesForShow] = useState([]);
  const [quantityForShow, setQuantityForShow] = useState(getStartQuantity());
  const [additionalQuantity, setAdditionalQuantity] = useState(
    getAdditionalQuantity()
  );
  const [isMoreMoviesButtonShow, setIsMoreMoviesButtonShow] = useState(
    isMoreMoviesButtonActive()
  );

  //достаем фильмы из ЛС для отрисовки
  useEffect(() => {
    if (localStorage.movies) {
      const savedMovies = JSON.parse(localStorage.movies);
      setMoviesForShow(savedMovies);
    }
  }, []);

  // проверяем есть ли сохраненные фильмы при монтировании
  useEffect(() => {
    mainApi
      .checkSavedMovies()
      .then((res) => setSavedMoviesArr(res.data))
      .catch(() => setErrorPopup('Ошибка API получения фильмов из БД!'));
  }, []);

  //сохранить фильм
  function handleSaveMovie(movieId) {
    let savedMovie = movies.filter((movie) => movie.id === movieId)[0];
    savedMovie.img = API_IMAGE_URL + savedMovie.image.url;
    return mainApi
      .saveMovie(
        savedMovie.country,
        savedMovie.director,
        savedMovie.duration,
        savedMovie.year,
        savedMovie.description,
        savedMovie.img,
        savedMovie.trailerLink,
        savedMovie.nameRU,
        savedMovie.nameEN,
        savedMovie.img,
        savedMovie.id
      )
      .then((res) => {
        setSavedMoviesArr([...savedMoviesArr, res.data]);
      })
      .catch(() => setErrorPopup('Ошибка API сохранения фильма в БД!'));
  }

  //удалить фильм
  function handleRemoveMovie(movieId) {
    let removedMovie = savedMoviesArr.filter(
      (movie) => movie.movieId === movieId
    )[0];
    return mainApi
      .removeMovie(removedMovie._id)
      .then((res) => {
        setSavedMoviesArr(
          savedMoviesArr.filter((movie) => movie.movieId !== movieId)
        );
      })
      .catch(() => setErrorPopup('Ошибка API удаления фильма из БД!'));
  }

  //поиск
  function handleSearch(query, short) {
    if (query && short) {
      let filteredMovies = movies.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(query.toLowerCase())) &&
          movie.duration <= SHORT_FILM_MAX_DURATION
      );
      setMoviesForShow(filteredMovies);
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
    } else if (query) {
      let filteredMovies = movies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
      setMoviesForShow(filteredMovies);
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
    }
    localStorage.setItem('searchQuery', JSON.stringify(query.toString()));
    localStorage.setItem('shortMovies', JSON.stringify(short));
  }

  // начальное количество фильмов
  function getStartQuantity() {
    if (windowWidth < MEDIUM_SCREEN_DATA.width) {
      return SMALL_SCREEN_DATA.shownQty;
    } else if (windowWidth < FULL_SCREEN_DATA.width && windowWidth >= MEDIUM_SCREEN_DATA.width) {
      return MEDIUM_SCREEN_DATA.shownQty;
    } else {
      return FULL_SCREEN_DATA.shownQty;
    }
  }

  // сколько показыаем дополнительно
  function getAdditionalQuantity() {
    if (windowWidth < MEDIUM_SCREEN_DATA.width) {
      return SMALL_SCREEN_DATA.addQty;
    } else if (windowWidth < FULL_SCREEN_DATA.width && windowWidth >= MEDIUM_SCREEN_DATA.width) {
      return MEDIUM_SCREEN_DATA.addQty;
    } else {
      return FULL_SCREEN_DATA.addQty;
    }
  }

  //кнопка Ещё
  function isMoreMoviesButtonActive() {
    return moviesForShow.length > quantityForShow;
  }

  function addMoreMovies() {
    setQuantityForShow((prev) => prev + additionalQuantity);
  }

  useEffect(() => {
    setQuantityForShow(getStartQuantity());
    setAdditionalQuantity(getAdditionalQuantity());
  }, [windowWidth]);

  useEffect(() => {
    if (moviesForShow.length <= quantityForShow) {
      setIsMoreMoviesButtonShow(false);
    } else {
      setIsMoreMoviesButtonShow(true);
    }
  }, [quantityForShow, moviesForShow.length]);

  return (
    <>
      <SearchForm
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onSaveMovie={handleSaveMovie}
          onRemoveMovie={handleRemoveMovie}
          isMoreMoviesButtonShow={isMoreMoviesButtonShow}
          moviesForShow={moviesForShow.filter(
            (item, index) => index < quantityForShow
          )}
          addMoreMovies={addMoreMovies}
          savedMoviesArr={savedMoviesArr}
          beatfilmApiError={beatfilmApiError}
        />
      )}
    </>
  );
}
