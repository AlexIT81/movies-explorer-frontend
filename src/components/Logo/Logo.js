import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link className='logo text-link' to='/' title='Проект Movie explorer'>
      <img src={logo} alt='Проект Movie explorer' className='logo__image' />
    </Link>
  );
}
