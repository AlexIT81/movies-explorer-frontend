import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import {
  fullScreenData,
  mediumScreenData,
  smallScreenData,
} from '../../utils/constants';
import WindowSize from '../hooks/WindowSize';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
  movies,
  handleSaveMovie,
  handleRemoveMovie,
  isFilterCheckboxChecked,
  searchQuery,
}) {
  const location = useLocation();
  const windowWidth = WindowSize();
  const [moviesForShow, setMoviesForShow] = useState(movies);
  const [quantityForShow, setQuantityForShow] = useState(getStartQuantity());
  const [additionalQuantity, setAdditionalQuantity] = useState(
    getAdditionalQuantity()
  );
  const [isMoreMoviesButtonShow, setIsMoreMoviesButtonShow] = useState(
    isMoreMoviesButtonActive()
  );

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
    if (moviesForShow.length <= quantityForShow) {
      setIsMoreMoviesButtonShow(false);
    }
  }, [quantityForShow, moviesForShow.length]);

  //переход на другую страницу
  useEffect(() => {
    setQuantityForShow(getStartQuantity());
    if (moviesForShow.length <= quantityForShow) {
      setIsMoreMoviesButtonShow(false);
    }
  }, [location.pathname]);

  //короткометражки и поисковый запрос сортировка стейта выводимых фильмов
  useEffect(() => {
    if (isFilterCheckboxChecked && searchQuery) {
      setMoviesForShow(
        movies.filter(
          (movie) =>
            (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())) &&
            movie.duration < 200
        )
      );
    } else if (isFilterCheckboxChecked) {
      setMoviesForShow(movies.filter((movie) => movie.duration < 200));
    } else if (searchQuery) {
      setMoviesForShow(
        movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setMoviesForShow(movies);
    }
  }, [isFilterCheckboxChecked, movies, searchQuery]);

  return (
    <section className='movies-card-list'>
      {moviesForShow.toString() ? (
        <ul className='movies-card-list__list'>
          {moviesForShow
            .filter((item, index) => index < quantityForShow)
            .map((movie) => (
              <MoviesCard
                key={movie._id}
                id={movie._id}
                thumbnail={movie.thumbnail}
                title={movie.nameRU}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                handleSaveMovie={handleSaveMovie}
                handleRemoveMovie={handleRemoveMovie}
              />
            ))}
        </ul>
      ) : (
        <h1 className='movies-card-list__empty-search'>
          Нету найденных фильмов!
        </h1>
      )}
      {isMoreMoviesButtonShow && (
        <button
          className='movies-card-list__more-btn btn-link'
          onClick={addMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
