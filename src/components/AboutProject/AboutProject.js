import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id={'about-project'}>
      <h2 className='about-project__title section-title'>О проекте</h2>
      <hr className='about-project__title-hr section-title-border'/>
      <div className='about-project__content-wrapper'>
        <article className='about-project__content-column'>
          <h3 className='about-project__content-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__content-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className='about-project__content-column'>
          <h3 className='about-project__content-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__content-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className='about-project__timeline-wrapper'>
        <div className='about-project__timeline-column'>
          <p className='about-project__timeline-name about-project__timeline-name_theme_green'>1 неделя</p>
          <span className='about-project__timeline-description'>Back-end</span>
        </div>
        <div className='about-project__timeline-column'>
          <p className='about-project__timeline-name'>4 недели</p>
          <span className='about-project__timeline-description'>Front-end</span>
        </div>
      </div>
    </section>
  );
}
