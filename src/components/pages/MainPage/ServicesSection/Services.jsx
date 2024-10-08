import s from './Services.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import {CommonTranslationsContext} from '../../../../App'

const Services = ({services}) => {
  const commonTranslations = useContext(CommonTranslationsContext);
  return (
    <section id={s.services}>
      <div className={s.header}>
        <h2 className={fonts.headerL}>{commonTranslations.sectionsHeaders.services.main}</h2>
      </div>
      <div className={s.servicesList}>
        {services.map( service => (
          <div key={service.id} className={s.serviceCard}>
            <div>
              <img
                src={process.env.PUBLIC_URL + service.photos[0].imageSrc}
                alt={service.photos[0].title}
                title={service.photos[0].title}
              />
            </div>
            <div className={s.serviceCardInfo}>
              <div className={s.serviceDetails}>
                <div className={s.serviceText}>
                  <h3 className={fonts.titleL}>{service.title}</h3>
                  <p className={`${fonts.textMRegular} ${s.serviceDescription}`}>{service.description}</p>
                </div>
                { service.minPrice !== null
                  ? <p className={`${fonts.textMRegular} ${s.minPrice}`}>
                      {commonTranslations.services.pricePreposition}&nbsp;
                      <span className={fonts.price}>{service.minPrice}</span>
                    </p>
                  : null
                }
              </div>
              <div className={s.serviceBtn}>
                <Link className={fonts.labelMSemiBold} to={`service/${service.id}`}>{commonTranslations.buttons.seviveItemMore}</Link>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </section>
  )
}

export default Services