import './App.css';
import Main from '../Main/Main';
import Layout from '../Layout/Layout';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [apiError, setApiError] = useState('');
  const [isEditActive, setisEditActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function isLoggedIn() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return true;
    } else {
      return false;
    }
  }
  //проверяем при монтировании приложения токен
  function checkToken(token) {
    return mainApi
      .checkAuth(token)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        onSignOut();
        console.error(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt);
    }
  }, [loggedIn]);

  //регистрация
  function onRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        onLogin({ email, password });
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
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  /** Выход пользователя */
  function onSignOut() {
    setLoggedIn(false);
    setCurrentUser('');
    localStorage.clear();
    navigate('/');
  }

  //редактирование профиля
  function onEditProfile({ name, email }) {
    return mainApi
      .updateUser(name, email)
      .then((res) => {
        setCurrentUser({ name: res.data.name, email: res.data.email });
        setApiError('Данные успешно обновлены!');
        setisEditActive(false);
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  function onEditActive() {
    setisEditActive(!isEditActive);
  }

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
                <ProtectedRoute element={Movies} loggedIn={loggedIn} />
              </Layout>
            }
          />
          <Route
            path='savedmovies'
            element={
              <Layout loggedIn={loggedIn}>
                <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
              </Layout>
            }
          />
          <Route
            path='profile'
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onSignOut={onSignOut}
                onEditProfile={onEditProfile}
                apiError={apiError}
                clearApiError={clearApiError}
                onEditActive={onEditActive}
                isEditActive={isEditActive}
              />
            }
          />
          <Route
            path='register'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register
                  onRegister={onRegister}
                  apiError={apiError}
                  clearApiError={clearApiError}
                />
              )
            }
          />
          <Route
            path='login'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login
                  onLogin={onLogin}
                  apiError={apiError}
                  clearApiError={clearApiError}
                />
              )
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
