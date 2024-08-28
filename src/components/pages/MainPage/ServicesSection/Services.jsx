import s from './Services.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { Link } from "react-router-dom"

const Services = ({services}) => (
    <section id={s.services}>
        <div className={s.header}>
          <h1 className={fonts.headerL}>Послуги</h1>
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
                        від&nbsp;
                        <span className={fonts.price}>{service.minPrice}</span>
                      </p>
                    : null
                  }
                </div>
                <div className={s.serviceBtn}>
                  <Link className={fonts.lableMSemiBold} to={`service/${service.id}`}> Детальніше </Link>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </section>
)

export default Services