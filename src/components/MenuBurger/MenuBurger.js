import './MenuBurger.css';
import BurgerMenuCloseButton from '../Buttons/BurgerMenuCloseButton/BurgerMenuCloseButton';
import { Link } from 'react-router-dom';
import BtnAccount from '../Buttons/AccountButton/AccountButton';

export default function MenuBurger({ isBurgerMenuActive, handleBurgerMenuCloseButtonClick, isMoviePage, isSavedMoviePage, isMainPage }) {

  return (
    <div className={`menu-burger ${isBurgerMenuActive && 'menu-burger_active'} `}>
      <div className='menu-burger__wrapper'>
        <BurgerMenuCloseButton handleBurgerMenuCloseButtonClick={handleBurgerMenuCloseButtonClick} />
        <nav className='menu-burger__nav'>
          <ul className='menu-burger__list'>
            <li className='menu-burger__item'>
              <Link className={`menu-burger__link ${isMainPage && 'menu-burger__link_active'} text-link`} to='/'>Главная</Link>
            </li>
            <li className='menu-burger__item'>
              <Link className={`menu-burger__link ${isMoviePage && 'menu-burger__link_active'}  text-link`} to='/movies'>Фильмы</Link>
            </li>
            <li className='menu-burger__item'>
              <Link className={`menu-burger__link ${isSavedMoviePage && 'menu-burger__link_active'}  text-link`} to='/savedmovies'>Сохранённые фильмы</Link>
            </li>
          </ul>
        </nav>
        <BtnAccount />
      </div>
    </div>
  );
}
