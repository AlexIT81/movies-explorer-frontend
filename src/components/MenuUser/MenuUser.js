import './MenuUser.css';
import { Link } from 'react-router-dom';

export default function MenuUser({ isMoviePage, isSavedMoviePage }) {
  return (
    <nav>
      <ul className='menu-user'>
        <li className='menu-user__item'>
          <Link className={`menu-user__link ${isMoviePage && 'menu-user__link_active'} text-link`} to='/movies'>
            Фильмы
          </Link>
        </li>
        <li className='menu-user__item'>
          <Link className={`menu-user__link ${isSavedMoviePage && 'menu-user__link_active'} text-link`} to='/savedmovies'>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}
