import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import s from './ServicePage.module.css'
import Gallery from '../../general/Gallery/Gallery';

const ServicePage = ({services}) => {

  const { idFromUrl } = useParams();
  const [serviceData, setServiceData] = useState(null);
  useEffect(() => {
    setServiceData( services.find(item => item.id === idFromUrl) )
  }, [services, idFromUrl]);

  return (
    <>
      {serviceData && (
        <div className={s.servicePage}>
          <div className={s.serviceBox}>
            <div>
              <h1>{serviceData.title}</h1>
            </div>
            <div className={s.serviceDetails}>
              <p>{serviceData.description}</p>
              <div className={s.list}>
                <h4>З чого складається ціна</h4>
                <ul>
                  {serviceData.priceExplanation.map((point, index) => (
                    <li key={index}>{point.title} <strong>{point.price}</strong></li>
                  ))}
                </ul>
              </div>
              <div className={s.list}>
                <h4>Що ви отримаєте в результаті:</h4>
                <ul>
                  {serviceData.whatYouWillGet.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={s.aditionalBox}>
            <div className={s.toOrderBox}>
              <div className={s.orderInfo}>
                <h1>Вартість</h1>
                <p>від <strong>{serviceData.minPrice}</strong></p>
              </div>
              <div className={s.toServicesBtn}>
                <Link to={`/order/${serviceData.id}`}>
                  Замовити послугу
                </Link>
              </div>
            </div>
            <Gallery photosList={serviceData.photos} />
          </div>
        </div>
      )}
    </>
  )               
}

export default ServicePage;