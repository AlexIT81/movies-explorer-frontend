import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title section-title section-title_place_portfolio'>
        Портфолио
      </h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a className='portfolio__text-link text-link' href='https://yoga.studioit.online' target='_blank' rel='noreferrer'>Статичный сайт</a>
          <a className='portfolio__btn-link btn-link' href='https://yoga.studioit.online/' target='_blank'  rel='noreferrer'><button className='portfolio__btn' type='button'></button></a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__text-link text-link' href='https://russian-travel.studioit.online' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
          <a className='portfolio__btn-link btn-link' href='https://russian-travel.studioit.online' target='_blank' rel='noreferrer'><button className='portfolio__btn' type='button'></button></a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__text-link text-link' href='https://mesto.studioit.online' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
          <a className='portfolio__btn-link btn-link' href='https://mesto.studioit.online' target='_blank' rel='noreferrer'><button className='portfolio__btn' type='button'></button></a>
        </li>
      </ul>
    </section>
  );
}
