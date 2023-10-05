import './ErrorPopup.css';
import icon from '../../images/popup_error.svg';

export default function ErrorPopup({ isOpen, errorMessage, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__wrapper'>
        <img src={icon} alt='Ошибка сервера' className='popup__icon' />
        <h3 className='popup__title'>{errorMessage}</h3>
        <p className='popup_description'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
        <button
          className='popup__close btn-link'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
