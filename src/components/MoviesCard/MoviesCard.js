import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { API_IMAGE_URL } from '../../utils/constants';

export default function MoviesCard({
  id,
  thumbnail,
  title,
  duration,
  trailerLink,
  onSaveMovie,
  onRemoveMovie,
  savedMoviesArr,
}) {
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const location = useLocation();
  const moviePage = location.pathname === '/movies';

  //проверка фильм на сохраненный
  useEffect(() => {
    if (savedMoviesArr) {
      if (savedMoviesArr.some((movie) => movie.movieId === id)) {
        setIsSavedMovie(true);
      } else {
        setIsSavedMovie(false);
      }
    }
  }, [savedMoviesArr]);

  const durationFormat = () => {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) % 60;
    return `${hours}ч ${minutes}м`;
  };

  const handleSaveMovie = () => {
    onSaveMovie(id);
  };

  const handleRemoveMovie = (e) => {
    onRemoveMovie(id);
  };

  return (
    <li className='movies-card'>
      <a
        className='movies-card__trailer-link'
        target='_blank'
        href={trailerLink}
        rel='noreferrer'
      >
        <img
          className='movies-card__image'
          src={`${ moviePage ? API_IMAGE_URL + thumbnail : thumbnail}`}
          alt={title}
        />
      </a>
      <div className='movies-card__content-wrapper'>
        <h2 className='movies-card__title'>{title}</h2>
        <span className='movies-card__duration'>{durationFormat()}</span>
        <button
          className={`movies-card__btn btn-link ${
            moviePage
              ? isSavedMovie
                ? 'movies-card__btn_action_saved'
                : ''
              : 'movies-card__btn_action_remove'
          }`}
          type='button'
          onClick={
            moviePage
              ? isSavedMovie
                ? handleRemoveMovie
                : handleSaveMovie
              : handleRemoveMovie
          }
        ></button>
      </div>
    </li>
  );
}
