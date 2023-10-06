import './FilterCheckbox.css';

export default function FilterCheckbox({
  isFilterCheckboxChecked,
  onFilterCheckbox,
  isFilterCheckboxDisabled
}) {
  function onChange() {
    onFilterCheckbox();
  }

  return (
    <div className='filter-checkbox'>
      <input
        className={`filter-checkbox__input ${isFilterCheckboxDisabled && 'filter-checkbox__input_disabled'}`}
        type='checkbox'
        id='checkbox'
        onChange={onChange}
        checked={isFilterCheckboxChecked || ''}
        disabled={isFilterCheckboxDisabled}
      ></input>
      <label className={`filter-checkbox__name btn-link ${isFilterCheckboxDisabled && 'filter-checkbox__name_disabled'}`} htmlFor='checkbox'>
        Короткометражки
      </label>
    </div>
  );
}
