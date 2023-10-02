import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { apiImageUrl } from '../../utils/constants';

export default function MoviesCard({
  id,
  thumbnail,
  title,
  duration,
  trailerLink,
  onSaveMovie,
  onRemoveMovie,
}) {
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const location = useLocation();
  const moviePage = location.pathname === '/movies';

  const durationFormat = () => {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) % 60;
    return `${hours}ч ${minutes}м`;
  };

  const handleSaveMovie = () => {
    moviePage && setIsSavedMovie(true);
    onSaveMovie(id);
  };

  const handleRemoveMovie = (e) => {
    moviePage && setIsSavedMovie(false);
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
          src={` ${apiImageUrl}${thumbnail} `}
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
