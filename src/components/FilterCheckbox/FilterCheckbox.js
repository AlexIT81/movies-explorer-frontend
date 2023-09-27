import './FilterCheckbox.css';

export default function FilterCheckbox({ isFilterCheckboxChecked, handleFilterCheckbox }) {

  function onChange() {
    handleFilterCheckbox();
  }

  return (
    <div className='filter-checkbox'>
      <input
        className='filter-checkbox__input'
        type='checkbox'
        id='checkbox'
        onChange={onChange}
        checked={isFilterCheckboxChecked || ''}
      ></input>
      <label className='filter-checkbox__name btn-link' htmlFor='checkbox'>
        Короткометражки
      </label>
    </div>
  );
}