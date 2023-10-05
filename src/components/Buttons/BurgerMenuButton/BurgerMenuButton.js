import './BurgerMenuButton.css';

export default function BurgerMenuButton({ handleBurgerMenuButtonClick }) {
  function onClick() {
    handleBurgerMenuButtonClick();
  }
  return (
    <button
      type='button'
      className='burger-menu-btn btn-link'
      onClick={onClick}
    ></button>
  );
}
