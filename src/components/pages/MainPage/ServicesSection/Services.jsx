import s from './Services.module.css'
import { Link } from "react-router-dom"

const Services = ({services}) => (
    <section id={s.services}>
        <div className={s.header}>
          <h1>Послуги</h1>
        </div>
        <div className={s.servicesList}>
          {services.map( service => (
            <div key={service.id} className={s.serviceCard}>
              <div>
                <img src={process.env.PUBLIC_URL + service.photos[0]} alt={service.title}/>
              </div>
              <div className={s.serviceCardInfo}>
                <div className={s.serviceDetails}>
                  <div className={s.serviceText}>
                    <h3>{service.title}</h3>
                    <p className={s.serviceDescription}>{service.description}</p>
                  </div>
                  <p className={s.minPrice}>від <strong>{service.minPrice}</strong></p>
                </div>
                <div className={s.serviceBtn}>
                  <Link to={`service/${service.id}`}> Детальніше </Link>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </section>
)

export default Services