import './App.css';
import Main from '../Main/Main';
import Layout from '../Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useState } from 'react';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path='movies'
          element={
            <Layout loggedIn={true}>
              <Movies />
            </Layout>
          }
        />
        <Route
          path='savedmovies'
          element={
            <Layout loggedIn={true}>
              <SavedMovies />
            </Layout>
          }
        />
        <Route path='profile' element={<Profile loggedIn={true} />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
