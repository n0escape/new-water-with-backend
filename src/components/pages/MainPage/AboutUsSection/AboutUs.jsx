import React from 'react'
import s from './AboutUs.module.css'
import { Link } from "react-router-dom"

const AboutUs = ({aboutUs}) => (
    <section id={s.aboutUs}>
      <img
        src={process.env.PUBLIC_URL + aboutUs.background.src}
        alt={aboutUs.background.title}
        title={aboutUs.background.title}
        className={s.bgImage}
      />
        <div className={s.details}>
          <div className={s.headline}>
            <h1>{aboutUs.companyName}</h1>
              <div className={s.slogan}>
                {aboutUs.slogan.map((element,index) => (
                  <p key={index}>{element}</p>
                ))}
              </div>
          </div>
          <p>
            {aboutUs.companyDescription.map((element, index) => (
              index === 0 || index % 2 === 0 
              ? <React.Fragment key={index}>{element}</React.Fragment>
              :<strong key={index}>{element}</strong>
            ))}
          </p>
        </div>
        <div className={s.stepsBlock}>
          <div className={s.stepsSection}>
            <div>
              <h2>4 простих кроки до Вашої свердловини</h2>
            </div>
            <div className={s.stepsContainer}>
              {aboutUs.mainSteps.map( step => (
                <div key={step.title} className={s.stepItem}>
                  <div className={s.header}>
                    <h3>{step.title}</h3>
                  </div>
                  <div className={s.info}>
                    <p>{step.description}</p>
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