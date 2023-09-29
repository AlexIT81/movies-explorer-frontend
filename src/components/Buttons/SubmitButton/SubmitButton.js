import './SubmitButton.css';

export default function SubmitButton({ disabled, onSubmit, text }) {
  return (
    <button
      type='submit'
      className={`submit-button btn-link ${
        disabled && 'submit-button_disabled'
      }`}
      onClick={onSubmit}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
