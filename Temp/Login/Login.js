import { useState } from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

export default function Login() {
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

    setloginError({
      ...loginError,
      [e.target.name]: e.target.validationMessage,
    });

    setIsFormValid(e.target.closest('form').checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
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
                  required
                />
              </label>
              <p className='login__input-error'>{loginError.password}</p>
            </div>
            <div className='login__buttons-wrapper'>
              <SubmitButton
                disabled={!isFormValid}
                onSubmit={onSubmit}
                text={'Сохранить'}
              />
              <p className='login__paragraph'>
                Ещё не зарегистрированы?{' '}
                <Link className='login__link text-link' to='/register'>
                  Регистрация
                </Link>
              </p>
              <p className='login__error-message'>Тут API ошибки авторизации</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
