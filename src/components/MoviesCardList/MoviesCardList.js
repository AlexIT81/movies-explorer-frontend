import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
  onSaveMovie,
  onRemoveMovie,
  onRemoveSavedMovie,
  moviesForShow,
  isMoreMoviesButtonShow,
  addMoreMovies,
  savedMoviesArr,
}) {
  const location = useLocation();
  const moviePage = location.pathname === '/movies';

  return (
    <section className='movies-card-list'>
      {moviesForShow.toString() ? (
        <ul className='movies-card-list__list'>
          {moviesForShow.map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              id={movie.id || movie._id}
              thumbnail={moviePage ? movie.image.url : movie.thumbnail}
              title={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={moviePage ? onRemoveMovie : onRemoveSavedMovie}
              savedMoviesArr={savedMoviesArr}
            />
          ))}
        </ul>
      ) : (
        <h1 className='movies-card-list__empty-search'>Ничего не найдено</h1>
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
