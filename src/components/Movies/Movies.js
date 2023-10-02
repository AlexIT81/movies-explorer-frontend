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
import { useLocation } from 'react-router-dom';

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const windowWidth = WindowSize();
  const [moviesForShow, setMoviesForShow] = useState([]);
  const [quantityForShow, setQuantityForShow] = useState(getStartQuantity());
  const [additionalQuantity, setAdditionalQuantity] = useState(
    getAdditionalQuantity()
  );
  const [isMoreMoviesButtonShow, setIsMoreMoviesButtonShow] = useState(
    isMoreMoviesButtonActive()
  );

  useEffect(() => {
    if (localStorage.movies) {
      const savedMovies = JSON.parse(localStorage.movies);
      setMoviesForShow(savedMovies);
    }
  }, []);

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

  //сохранить
  function handleSaveMovie(movieId) {}

  //удалить
  function handleRemoveMovie(movieId) {}

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
          movie.duration < 100
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
    let filteredMovies = movies.filter(
      (movie) => {
        return (
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase()))
      }
    );
    setMoviesForShow(filteredMovies)
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
          searchQuery={searchQuery}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
          movies={movies}
          onSaveMovie={handleSaveMovie}
          onRemoveMovie={handleRemoveMovie}
          isMoreMoviesButtonShow={isMoreMoviesButtonShow}
          moviesForShow={moviesForShow}
          addMoreMovies={addMoreMovies}
          quantityForShow={quantityForShow}
        />
      )}
    </>
  );
}
