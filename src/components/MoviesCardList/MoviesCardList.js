import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


export default function MoviesCardList({
  onSaveMovie,
  onRemoveMovie,
  moviesForShow,
  isMoreMoviesButtonShow,
  addMoreMovies,
  quantityForShow,
  savedMoviesArr,
}) {

  return (
    <section className='movies-card-list'>
      {moviesForShow.toString() ? (
        <ul className='movies-card-list__list'>
          {moviesForShow
            .filter((item, index) => index < quantityForShow)
            .map((movie) => (
              <MoviesCard
                key={movie.id}
                id={movie.id}
                thumbnail={movie.image.url}
                title={movie.nameRU}
                duration={movie.duration}
                trailerLink={movie.trailerLink}
                onSaveMovie={onSaveMovie}
                onRemoveMovie={onRemoveMovie}
                savedMoviesArr={savedMoviesArr}
              />
            ))}
        </ul>
      ) : (
        <h1 className='movies-card-list__empty-search'>
          Ничего не найдено
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
