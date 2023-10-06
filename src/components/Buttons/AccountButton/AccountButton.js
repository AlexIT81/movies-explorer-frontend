import { Link } from 'react-router-dom';
import './AccountButton.css';

export default function BtnAccount() {
  return (
    <Link to='/profile' className='btn-account btn-link'>
      Аккаунт
    </Link>
  );
}
