import { useState } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

export default function Register({ onRegister, apiError, clearApiError, isReadOnly }) {
  const [register, setregister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  function onChange(e) {
    setregister({ ...register, [e.target.name]: e.target.value });

    if (e.target.name === 'name' && e.target.validationMessage === 'Введите данные в указанном формате.') {
      setRegisterError({
        ...registerError,
        name: 'Поле содержит только латиницу, кириллицу, пробел или дефис.',
      });
    } else if(e.target.name === 'email' && e.target.validationMessage === 'Введите данные в указанном формате.') {
      setRegisterError({
        ...registerError,
        email: 'Введите email в формате example@ya.ru',
      });
    } else {
      setRegisterError({
        ...registerError,
        [e.target.name]: e.target.validationMessage,
      });
    }

    setIsFormValid(e.target.closest('form').checkValidity());
    clearApiError();
  }

  function onSubmit(e) {
    e.preventDefault();
    onRegister(register);
  }

  return (
    <>
      <section className='register'>
        <div className='register__wrapper'>
          <div className='register__logo'>
            <Logo />
          </div>
          <h1 className='register__title'>Добро пожаловать!</h1>
          <form className='register__form' name='register'>
            <div className='register__inputs-wrapper'>
              <label className='register__input-wrapper'>
                <span className='register__input-label'>Имя</span>
                <input
                  className={`register__input ${
                    registerError.name && 'register__input_place_error'
                  }`}
                  placeholder='Имя'
                  name='name'
                  type='text'
                  minLength='2'
                  maxLength='30'
                  pattern={'^[а-яА-ЯёЁa-zA-Z\\s\\-]+$'}
                  value={register.name}
                  onChange={onChange}
                  readOnly={isReadOnly}
                  required
                />
              </label>
              <p className='register__input-error'>{registerError.name}</p>
              <label className='register__input-wrapper'>
                <span className='register__input-label'>E-mail</span>
                <input
                  className={`register__input ${
                    registerError.email && 'register__input_place_error'
                  }`}
                  placeholder='example@ya.ru'
                  name='email'
                  type='email'
                  pattern={'^.+@.+\\..{2,}$'}
                  value={register.email}
                  onChange={onChange}
                  readOnly={isReadOnly}
                  required
                />
              </label>
              <p className='register__input-error'>{registerError.email}</p>
              <label className='register__input-wrapper'>
                <span className='register__input-label'>Пароль</span>
                <input
                  className={`register__input ${
                    registerError.password && 'register__input_place_error'
                  }`}
                  placeholder='Пароль'
                  name='password'
                  type='password'
                  minLength='8'
                  maxLength='30'
                  value={register.password}
                  onChange={onChange}
                  readOnly={isReadOnly}
                  required
                />
              </label>
              <p className='register__input-error'>{registerError.password}</p>
            </div>
            <div className='register__buttons-wrapper'>
              <SubmitButton
                disabled={!isFormValid}
                onSubmit={onSubmit}
                text={'Зарегистрироваться'}
              />
              <p className='register__paragraph'>
                Уже зарегистрировались?{' '}
                <Link className='register__link text-link' to='/login'>
                  Войти
                </Link>
              </p>
              <p
                className={`register__error-message ${
                  apiError && 'register__error-message_active'
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
