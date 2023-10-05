import './Techs.css';

export default function Techs() {
  return (
    <section className='techs' id={'techs'}>
      <h2 className='techs__title section-title'>Технологии</h2>
      <hr className='techs__title-hr section-title-border' />
      <div className='techs__content-wrapper'>
        <h3 className='techs__content-title'>7 технологий</h3>
        <p className='techs__content-description'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__list-wrapper'>
          <li className='techs__list-item'>HTML</li>
          <li className='techs__list-item'>CSS</li>
          <li className='techs__list-item'>JS</li>
          <li className='techs__list-item'>React</li>
          <li className='techs__list-item'>Git</li>
          <li className='techs__list-item'>Express.js</li>
          <li className='techs__list-item'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
