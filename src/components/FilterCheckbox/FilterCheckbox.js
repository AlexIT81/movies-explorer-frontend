import './FilterCheckbox.css';

export default function FilterCheckbox({
  isFilterCheckboxChecked,
  onFilterCheckbox,
}) {
  function onChange() {
    onFilterCheckbox();
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
