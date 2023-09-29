import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WindowSize from '../hooks/WindowSize';
import MenuStart from '../MenuStart/MenuStart';
import MenuUser from '../MenuUser/MenuUser';
import BtnAccount from '../Buttons/AccountButton/AccountButton';
import './Navigation.css';
import MenuBurger from '../MenuBurger/MenuBurger';
import BurgerMenuButton from '../Buttons/BurgerMenuButton/BurgerMenuButton';

export default function Navigation({ loggedIn }) {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
  const windowWidth = WindowSize();
  const location = useLocation();
  const [isMoviePage, setIsMoviePage] = useState(false);
  const [isSavedMoviePage, setIsSavedMoviePage] = useState(false);
  const [isMainPage, setIsMainPage] = useState(false);

  useEffect(() => {
    if (windowWidth < 1280) {
      setIsBurgerMenu(true);
    } else {
      setIsBurgerMenu(false);
      setIsBurgerMenuActive(false);
    }
  }, [windowWidth]);

  function handleBurgerMenuButtonClick() {
    setIsBurgerMenuActive(true);
  }

  function handleBurgerMenuCloseButtonClick() {
    setIsBurgerMenuActive(false);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsMoviePage(true);
      setIsSavedMoviePage(false);
      setIsMainPage(false);
    } else if (location.pathname === '/savedmovies') {
      setIsSavedMoviePage(true);
      setIsMoviePage(false);
      setIsMainPage(false);
    } else if (location.pathname === '/') {
      setIsMainPage(true);
      setIsSavedMoviePage(false);
      setIsMoviePage(false);
    }
    handleBurgerMenuCloseButtonClick();
  }, [location.pathname]);

  return (
    <>
      {loggedIn ? (
        isBurgerMenu ? (
          <BurgerMenuButton
            handleBurgerMenuButtonClick={handleBurgerMenuButtonClick}
          />
        ) : (
          <>
            <MenuUser
              isMoviePage={isMoviePage}
              isSavedMoviePage={isSavedMoviePage}
            />
            <nav>
              <BtnAccount />
            </nav>
          </>
        )
      ) : (
        <MenuStart />
      )}
      {isBurgerMenu && (
        <MenuBurger
          isBurgerMenuActive={isBurgerMenuActive}
          handleBurgerMenuCloseButtonClick={handleBurgerMenuCloseButtonClick}
          isMoviePage={isMoviePage}
          isSavedMoviePage={isSavedMoviePage}
          isMainPage={isMainPage}
        />
      )}
    </>
  );
}
