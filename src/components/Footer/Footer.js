import './Footer.css';

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <hr className='footer__line' />
      <div className='footer__content-wrapper'>
        <p className='footer__copyright'>&copy; {date}</p>
        <nav>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <a
                href='https://practicum.yandex.ru/'
                className='footer__link text-link'
                target='_blank'
                rel='noreferrer'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__list-item'>
              <a
                href='https://github.com/AlexIT81'
                className='footer__link text-link'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
