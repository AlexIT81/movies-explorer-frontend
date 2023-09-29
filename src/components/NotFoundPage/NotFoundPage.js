import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className='not-found-page'>
      <div className='not-found-page__wrapper'>
        <h1 className='not-found-page__title'>404</h1>
        <p className='not-found-page__description'>Страница не найдена</p>
      </div>
      <button
        className='not-found-page__btn btn-link'
        type='button'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </section>
  );
}
