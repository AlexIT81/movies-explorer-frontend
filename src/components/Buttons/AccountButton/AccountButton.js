import { Link } from 'react-router-dom';
import './AccountButton.css';

export default function BtnAccount() {
  return (
    <Link to='/profile'>
    <button className='btn-account btn-link' type='button'>
      Аккаунт
    </button>
    </Link>
  );
}
