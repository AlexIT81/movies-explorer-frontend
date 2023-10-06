import { useState } from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

export default function Login({
  onLogin,
  apiError,
  clearApiError,
  isReadOnly,
}) {
  const [login, setlogin] = useState({
    email: '',
    password: '',
  });
  const [loginError, setloginError] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  function onChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });

    if (
      e.target.name === 'email' &&
      e.target.validationMessage === 'Введите данные в указанном формате.'
    ) {
      setloginError({
        ...loginError,
        email: 'Введите email в формате example@ya.ru',
      });
    } else {
      setloginError({
        ...loginError,
        [e.target.name]: e.target.validationMessage,
      });
    }

    setIsFormValid(e.target.closest('form').checkValidity());
    clearApiError();
  }

  function onSubmit(e) {
    e.preventDefault();
    onLogin(login);
  }

  return (
    <>
      <section className='login'>
        <div className='login__wrapper'>
          <div className='login__logo'>
            <Logo />
          </div>
          <h1 className='login__title'>Рады видеть!</h1>
          <form className='login__form' name='login'>
            <div className='login__inputs-wrapper'>
              <label className='login__input-wrapper'>
                <span className='login__input-label'>E-mail</span>
                <input
                  className={`login__input ${
                    loginError.email && 'login__input_place_error'
                  }`}
                  placeholder='example@ya.ru'
                  name='email'
                  type='email'
                  pattern={'^.+@.+\\..{2,}$'}
                  value={login.email}
                  onChange={onChange}
                  readOnly={isReadOnly}
                  required
                />
              </label>
              <p className='login__input-error'>{loginError.email}</p>
              <label className='login__input-wrapper'>
                <span className='login__input-label'>Пароль</span>
                <input
                  className={`login__input ${
                    loginError.password && 'login__input_place_error'
                  }`}
                  placeholder='Пароль'
                  name='password'
                  type='password'
                  minLength='8'
                  maxLength='30'
                  value={login.password}
                  onChange={onChange}
                  readOnly={isReadOnly}
                  required
                />
              </label>
              <p className='login__input-error'>{loginError.password}</p>
            </div>
            <div className='login__buttons-wrapper'>
              <SubmitButton
                disabled={!isFormValid || isReadOnly}
                onSubmit={onSubmit}
                text={'Войти'}
              />
              <p className='login__paragraph'>
                Ещё не зарегистрированы?{' '}
                <Link className='login__link text-link' to='/register'>
                  Регистрация
                </Link>
              </p>
              <p
                className={`login__error-message ${
                  apiError && 'login__error-message_active'
                }`}
              >
                {apiError}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
