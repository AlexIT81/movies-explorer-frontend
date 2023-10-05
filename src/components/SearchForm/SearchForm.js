import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useState, useEffect } from 'react';

export default function SearchForm({ onSearch, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryError, setSearchQueryError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [isFilterCheckboxDisabled, setIsFilterCheckboxDisabled] = useState(false);

  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  //при перезагрузки обновляем searchQuery и короткометражки
  useEffect(() => {
    if (localStorage.searchQuery && moviesPage) {
      setSearchQuery(JSON.parse(localStorage.searchQuery));
    }
    if (localStorage.shortMovies && moviesPage) {
      setIsFilterCheckboxChecked(JSON.parse(localStorage.shortMovies));
    }
  }, []);

  function handleFilterCheckbox() {
    onSearch(searchQuery, !isFilterCheckboxChecked);
    setIsFilterCheckboxChecked(!isFilterCheckboxChecked);
  }

  function onChange(e) {
    setSearchQuery(e.target.value);
    if (!e.target.value) {
      setIsFilterCheckboxDisabled(true);
      setSearchQueryError('Нужно ввести ключевое слово');
    } else {
      setIsFilterCheckboxDisabled(false);
      setSearchQueryError('');
    }
    setIsFormValid(e.target.closest('form').checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
      onSearch(searchQuery, isFilterCheckboxChecked);
  }

  return (
    <div className='search'>
      <form className='search__form' name='search__form'>
        <input
          className={`search__input ${
            searchQueryError && 'search__input_place_error'
          } `}
          type='text'
          name='search'
          placeholder='Фильм'
          minLength='1'
          value={searchQuery}
          onChange={onChange}
          readOnly={isLoading}
          required
        ></input>
        <button
          className={`search__button btn-link ${
            (isLoading || !isFormValid) && 'search__button_disabled'
          }`}
          type='submit'
          onClick={onSubmit}
          disabled={isLoading || !isFormValid}
        ></button>
        <p className='search__input-error'>{searchQueryError}</p>
      </form>
      <FilterCheckbox
        onFilterCheckbox={handleFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
        isFilterCheckboxDisabled={isFilterCheckboxDisabled}
      />
      <hr className='search__hr'></hr>
    </div>
  );
}
