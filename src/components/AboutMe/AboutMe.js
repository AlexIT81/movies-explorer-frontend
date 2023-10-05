import './AboutMe.css';
import student from '../../images/student.jpg';

export default function AboutMe() {
  return (
    <section className='about-me' id={'about-me'}>
      <h2 className='about-me__title section-title'>Студент</h2>
      <hr className='about-me__title-hr section-title-border' />
      <div className='about-me__content-wrapper'>
        <div className='about-me__content-column-wrapper'>
          <article className='about-me__article'>
            <h3 className='about-me__article-title'>Виталий</h3>
            <h4 className='about-me__article-subtitle'>
              Фронтенд-разработчик, 30 лет
            </h4>
            <p className='about-me__article-description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </article>
          <a
            className='about-me__article-link text-link'
            target='_blank'
            href='https://github.com/AlexIT81'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img
          className='about-me__content-img'
          src={student}
          alt='Виталий - фронтенд-разработчик.'
        />
      </div>
    </section>
  );
}
