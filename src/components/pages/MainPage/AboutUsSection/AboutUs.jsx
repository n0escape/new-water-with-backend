import s from './AboutUs.module.css'
import { Link } from "react-router-dom"

const AboutUs = ({aboutUs}) => (
    <section id={s.aboutUs}>
        <div className={s.details}>
          <h1>{aboutUs.companyName}</h1>
          <p>{aboutUs.companyDescription}</p>
        </div>
        <div className={s.featuresBlock}>
          <div className={s.featuresSection}>
            <div>
              <h2>Обираючи нас ви отримаєте</h2>
            </div>
            <div className={s.featuresContainer}>
              {aboutUs.advantages.map( avantage => (
                <div key={avantage.title} className={s.featureItem}>
                  <div className={s.header}>
                    <h3>{avantage.title}</h3>
                  </div>
                  <div className={s.info}>
                    <p>{avantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.contactUsBtn}>
            <Link to="/#anchorContactUs">Залишити замовлення</Link>
          </div>
        </div>
      </section>
)

export default AboutUs