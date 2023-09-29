import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__item'>
          <a className='navtab__link text-link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='navtab__item'>
          <a className='navtab__link text-link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navtab__item'>
          <a className='navtab__link text-link' href='#about-me'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
