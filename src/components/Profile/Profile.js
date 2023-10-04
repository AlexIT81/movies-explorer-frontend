import { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({
  loggedIn,
  onSignOut,
  onEditProfile,
  apiError,
  clearApiError,
  onEditActive,
  isEditActive
}) {
  // const [isEditActive, setisEditActive] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [profileError, setProfileError] = useState({ name: '', email: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    let isMatches = (currentUser.name !== profile.name) || (currentUser.email !== profile.email);
      setIsButtonActive(isMatches);
  }, [profile, currentUser, isFormValid]);

  function onChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });

    if (e.target.name === 'name' && e.target.validationMessage === 'Введите данные в указанном формате.') {
      setProfileError({
        ...profileError,
        name: 'Поле содержит только латиницу, кириллицу, пробел или дефис.',
      });
    } else if(e.target.name === 'email' && e.target.validationMessage === 'Введите данные в указанном формате.') {
      setProfileError({
        ...profileError,
        email: 'Введите email в формате example@ya.ru',
      });
    } else {
      setProfileError({
        ...profileError,
        [e.target.name]: e.target.validationMessage,
      });
    }

    setIsFormValid(e.target.closest('form').checkValidity());
    clearApiError();
  }

  function onEdit() {
    onEditActive();
  }

  function onSubmit(e) {
    e.preventDefault();
    onEditProfile(profile);
  }

  function handleSignOut() {
    onSignOut();
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
                  pattern={'^[а-яА-ЯёЁa-zA-Z\\s\\-]+$'}
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
                  disabled={!isFormValid || !isButtonActive}
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
                    onClick={handleSignOut}
                  >
                    Выйти из аккаунта
                  </button>
                </>
              )}
              <p
                className={`profile__error-message ${
                  apiError && 'profile__error-message_active'
                }`}
              >
                {apiError}
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
