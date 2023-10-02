import { useState, useContext } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ loggedIn }) {
  const [isEditActive, setisEditActive] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileError, setProfileError] = useState({ name: '', email: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function onChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });

    setProfileError({
      ...profileError,
      [e.target.name]: e.target.validationMessage,
    });

    setIsFormValid(e.target.closest('form').checkValidity());
  }

  function onEdit() {
    setisEditActive(true);
  }

  function onSubmit(e) {
    e.preventDefault();
    setisEditActive(false);
  }

  function handleExit() {
    console.log('logout');
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='main'>
        <section className='profile'>
          <h1 className='profile__title'>Привет, Виталий</h1>
          <form className='profile__form' name='profile'>
            <div className='profile__inputs-wrapper'>
              <label className='profile__input-wrapper'>
                <span className='profile__input-label'>Имя</span>
                <input
                  className={`profile__input ${
                    profileError.name && 'profile__input_place_error'
                  }`}
                  placeholder='Имя'
                  name='name'
                  type='text'
                  minLength='2'
                  maxLength='30'
                  value={profile.name}
                  onChange={onChange}
                  disabled={!isEditActive}
                  required
                />
              </label>
              <p className='profile__input-error'>{profileError.name}</p>
              <hr className='profile__line' />
              <label className='profile__input-wrapper'>
                <span className='profile__input-label'>E-mail</span>
                <input
                  className={`profile__input ${
                    profileError.email && 'profile__input_place_error'
                  }`}
                  placeholder='example@ya.ru'
                  name='email'
                  type='email'
                  pattern={'^.+@.+\\..{2,}$'}
                  value={profile.email}
                  onChange={onChange}
                  disabled={!isEditActive}
                  required
                />
              </label>
              <p className='profile__input-error'>{profileError.email}</p>
            </div>
            <div className='profile__buttons-wrapper'>
              {isEditActive ? (
                <SubmitButton
                  disabled={!isFormValid}
                  onSubmit={onSubmit}
                  text={'Сохранить'}
                />
              ) : (
                <>
                  <button
                    type='button'
                    className='profile__button btn-link'
                    onClick={onEdit}
                  >
                    Редактировать
                  </button>
                  <button
                    type='button'
                    className='profile__button profile__button_exit btn-link'
                    onClick={handleExit}
                  >
                    Выйти из аккаунта
                  </button>
                </>
              )}
              <p className='profile__error-message'>
                Тут ошибки сохранения
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
