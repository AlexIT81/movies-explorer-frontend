import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}
