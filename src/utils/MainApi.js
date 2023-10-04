import { apiMainUrl } from './constants';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => {
      throw new Error(err.message);
    });
  }
};

export const register = (name, email, password) => {
  return fetch(`${apiMainUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkRes(res));
};

export const login = (email, password) => {
  return fetch(`${apiMainUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
};

export const checkAuth = (token) => {
  return fetch(`${apiMainUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkRes(res));
};

export const updateUser = (name, email) => {
  return fetch(`${apiMainUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => checkRes(res));
};

export const saveMovie = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  thumbnail,
  movieId
) => {
  return fetch(`${apiMainUrl}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    }),
  }).then((res) => checkRes(res));
};

export const checkSavedMovies = () => {
  return fetch(`${apiMainUrl}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => checkRes(res));
};

export const removeMovie = (id) => {
  return fetch(`${apiMainUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => checkRes(res));
};
