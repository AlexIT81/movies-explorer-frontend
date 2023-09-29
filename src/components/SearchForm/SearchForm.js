import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useState, useEffect } from 'react';

export default function SearchForm({
  isFilterCheckboxChecked,
  handleFilterCheckbox,
  handleSearch
}) {
  const [isFormValid, setIsFormValid] = useState(false);
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
    setSearchQueryError(e.target.validationMessage);
    setIsFormValid(e.target.closest('form').checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSearch(searchQuery);
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
          minLength='3'
          value={searchQuery}
          onChange={onChange}
          required
        ></input>
        <button
          className='search__button'
          // className={`search__button ${
          //   !isFormValid ? 'search__button_disabled' : 'btn-link'
          // } `}
          type='submit'
          onClick={onSubmit}
          // disabled={!isFormValid}
        ></button>
        <p className='search__input-error'>{searchQueryError}</p>
      </form>
      <FilterCheckbox
        handleFilterCheckbox={handleFilterCheckbox}
        isFilterCheckboxChecked={isFilterCheckboxChecked}
      />
      <hr className='search__hr'></hr>
    </div>
  );
}
