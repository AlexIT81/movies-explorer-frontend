import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import {
  fullScreenData,
  mediumScreenData,
  smallScreenData,
} from '../../utils/constants';
import WindowSize from '../hooks/WindowSize';
import * as mainApi from '../../utils/MainApi';
import { apiImageUrl } from '../../utils/constants';

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);

  const windowWidth = WindowSize();
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

  //заполняем стейт фильмами со сторонненго api
  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) =>
        console.error(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        )
      )
      .finally(() => setIsLoading(false));
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

  // проверяем есть ли сохраненные фильмы при монтировании
  useEffect(() => {
    mainApi
      .checkSavedMovies()
      .then((res) => setSavedMoviesArr(res.data))
      .catch((err) => console.error(err));
  }, []);

  //сохранить фильм
  function handleSaveMovie(movieId) {
    let savedMovie = movies.filter((movie) => movie.id === movieId)[0];
    savedMovie.img = apiImageUrl + savedMovie.image.url;
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
      .catch((err) => console.log(err));
  }

  //удалить фильм
  function handleRemoveMovie(movieId) {
    let removedMovie = savedMoviesArr.filter((movie) => movie.movieId === movieId)[0]
    return mainApi
      .removeMovie(removedMovie._id)
      .then((res) => {
        setSavedMoviesArr(savedMoviesArr.filter((movie) => movie.movieId !== movieId))
      })
      .catch((err) => console.log(err));
  }

  //клик по короткометражкам отправляем в другой компонент стейт
  function handleFilterCheckbox() {
    localStorage.setItem(
      'shortMovies',
      JSON.stringify(!isFilterCheckboxChecked)
    );
    setIsFilterCheckboxChecked(!isFilterCheckboxChecked);
    if (!isFilterCheckboxChecked) {
      let filtered = movies.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())) &&
          movie.duration <= 40
      );
      setMoviesForShow(filtered);
      localStorage.setItem('movies', JSON.stringify(filtered));
    } else {
      handleSearch(searchQuery);
    }
  }

  //поиск
  function handleSearch(query) {
    localStorage.setItem('searchQuery', JSON.stringify(query));
    setSearchQuery(query.toString().trim());
    let filteredMovies = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
    });
    setMoviesForShow(filteredMovies);
    localStorage.setItem('movies', JSON.stringify(filteredMovies));
  }

  // начальное количество фильмов
  function getStartQuantity() {
    if (windowWidth < 768) {
      return smallScreenData.shownQty;
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      return mediumScreenData.shownQty;
    } else {
      return fullScreenData.shownQty;
    }
  }

  // сколько показыаем дополнительно
  function getAdditionalQuantity() {
    if (windowWidth < 768) {
      return smallScreenData.addQty;
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      return mediumScreenData.addQty;
    } else {
      return fullScreenData.addQty;
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
        onFilterCheckbox={handleFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          onSaveMovie={handleSaveMovie}
          onRemoveMovie={handleRemoveMovie}
          isMoreMoviesButtonShow={isMoreMoviesButtonShow}
          moviesForShow={moviesForShow}
          addMoreMovies={addMoreMovies}
          quantityForShow={quantityForShow}
          savedMoviesArr={savedMoviesArr}
        />
      )}
    </>
  );
}
