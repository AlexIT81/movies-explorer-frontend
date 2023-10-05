import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useState, useEffect } from 'react';

export default function SearchForm({
  isFilterCheckboxChecked,
  onFilterCheckbox,
  onSearch,
  isLoading,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryError, setSearchQueryError] = useState('');
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';

  //при перезагрузки обновляем searchQuery и value инпута
  useEffect(() => {
    if (localStorage.searchQuery && moviesPage) {
      setSearchQuery(JSON.parse(localStorage.searchQuery));
    }
  }, []);

  function onChange(e) {
    setSearchQuery(e.target.value);
    setSearchQueryError('');
  }

  function onSubmit(e) {
    e.preventDefault();
    if (searchQuery === '' || searchQuery === ' ') {
      setSearchQueryError('Нужно ввести ключевое слово');
    } else {
      setSearchQueryError('');
      onSearch(searchQuery);
    }
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
            isLoading && 'search__button_disabled'
          }`}
          type='submit'
          onClick={onSubmit}
          disabled={isLoading}
        ></button>
        <p className='search__input-error'>{searchQueryError}</p>
      </form>
      <FilterCheckbox
        onFilterCheckbox={onFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
      />
      <hr className='search__hr'></hr>
    </div>
  );
}
