import React from 'react'
import s from './AboutUs.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { Link } from "react-router-dom"

const AboutUs = ({aboutUs}) => (
    <section id={s.aboutUs}>
        <div className={s.details}>
          <div className={s.headline}>
            <h1 className={fonts.display}>{aboutUs.companyName}</h1>
              <div className={s.slogan}>
                {aboutUs.slogan.map((element,index) => (
                  <p className={index === 0 ? fonts.headerM : fonts.headerS}
                    key={index}
                  >
                    {element}
                  </p>
                ))}
              </div>
          </div>
          <p className={fonts.textMRegular}>
            {aboutUs.companyDescription.map((element, index) => (
              index === 0 || index % 2 === 0 
              ? <React.Fragment key={index}>{element}</React.Fragment>
              :<strong className={fonts.textMBold} key={index}>{element}</strong>
            ))}
          </p>
        </div>
        <div className={s.stepsBlock}>
          <div className={s.stepsSection}>
            <h2 className={fonts.headerS}>4 простих кроки до Вашої свердловини</h2>
            <div className={s.stepsContainer}>
              {aboutUs.mainSteps.map( step => (
                <div key={step.title} className={s.stepItem}>
                  <div className={s.header}>
                    <h3 className={fonts.titleS}>{step.title}</h3>
                  </div>
                  <div className={s.info}>
                    <p className={fonts.textS}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.contactUsBtn}>
            <Link className={fonts.lableLSemiBold} to="/#anchorContactUs">Залишити замовлення</Link>
          </div>
        </div>
      </section>
)

export default AboutUs