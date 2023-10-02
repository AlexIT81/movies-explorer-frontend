import './App.css';
import Main from '../Main/Main';
import Layout from '../Layout/Layout';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  //регистрация
  function onRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        console.log(res); // тут логин и редирект
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  //логинемся
  function onLogin({ email, password }) {
    return mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setCurrentUser(res);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  //проверяем при монтировании приложения токен
  const checkToken = (token) => {
    return mainApi
      .checkAuth(token)
      .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt);
    }
  }, []);

  //очистка api ошибок
  function clearApiError() {
    setApiError('');
  }

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/'
            element={
              <Layout loggedIn={loggedIn}>
                <Main />
              </Layout>
            }
          />
          <Route
            path='movies'
            element={
              <Layout loggedIn={loggedIn}>
                <Movies />
              </Layout>
            }
          />
          <Route
            path='savedmovies'
            element={
              <Layout loggedIn={loggedIn}>
                <SavedMovies />
              </Layout>
            }
          />
          <Route path='profile' element={<Profile loggedIn={loggedIn} />} />
          <Route
            path='register'
            element={
              <Register
                onRegister={onRegister}
                apiError={apiError}
                clearApiError={clearApiError}
              />
            }
          />
          <Route
            path='login'
            element={
              <Login
                onLogin={onLogin}
                apiError={apiError}
                clearApiError={clearApiError}
              />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
