import './MenuStart.css';
import { Link } from 'react-router-dom';

export default function MenuStart() {
  return (
    <nav>
      <ul className='menu-start'>
        <li className='menu-start__item'>
          <Link className='menu-start__link text-link' to='/register'>
            Регистрация
          </Link>
        </li>
        <li className='menu-start__item'>
          <Link
            className='menu-start__link menu-start__link_big text-link'
            to='/login'
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}
