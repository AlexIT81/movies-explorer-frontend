import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({
  id,
  thumbnail,
  title,
  duration,
  trailerLink,
  handleSaveMovie,
  handleRemoveMovie,
}) {
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const location = useLocation();
  const moviePage = location.pathname === '/movies';

  const durationFormat = () => {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) % 60;
    return `${hours}ч ${minutes}м`;
  };

  const onSaveMovie = () => {
    moviePage && setIsSavedMovie(true);
    handleSaveMovie(id);
  };

  const onRemoveMovie = (e) => {
    moviePage && setIsSavedMovie(false);
    handleRemoveMovie(id);
  };

  useEffect(() => {
    if (
      localStorage.savedMovies &&
      JSON.parse(localStorage.savedMovies).length > 0
    ) {
      let moviesArr = JSON.parse(localStorage.savedMovies);
      setIsSavedMovie(moviesArr.some((item) => {
          return item._id === id;
        }))
    }
  });

  return (
    <li className='movies-card'>
      <a
        className='movies-card__trailer-link'
        target='_blank'
        href={trailerLink}
        rel='noreferrer'
      >
        <img className='movies-card__image' src={thumbnail} alt={title} />
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
                ? onRemoveMovie
                : onSaveMovie
              : onRemoveMovie
          }
        ></button>
      </div>
    </li>
  );
}
