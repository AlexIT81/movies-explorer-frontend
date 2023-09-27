import './BurgerMenuCloseButton.css';

export default function BurgerMenuCloseButton({ handleBurgerMenuCloseButtonClick }) {

  function onClick() {
    handleBurgerMenuCloseButtonClick();
  }
  return (
    <button type='button' className='burger-menu-close-btn btn-link' onClick={onClick}></button>
  );
}
