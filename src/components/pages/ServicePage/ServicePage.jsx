import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import s from './ServicePage.module.css'
import Gallery from '../../general/Gallery/Gallery';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../../../App';
import Product from '../../microMarkups/Product';

const ServicePage = ({services}) => {

  const { idFromUrl } = useParams();
  const [serviceData, setServiceData] = useState(null);
  useEffect(() => {
    setServiceData( services.find(item => item.id === idFromUrl) )
  }, [services, idFromUrl]);
  const canonicalUrl = `${baseUrl}/service/${idFromUrl}`;

  return (
    <HelmetProvider>
      {serviceData && (
        <>
          <Helmet>
            <title>Послуга {serviceData.title.toLowerCase()} | New Water</title>
            <meta name="description" content={serviceData.shortDescription} />
            <meta name="keywords" content={serviceData.title.toLowerCase() +", new water, нова вода, новая вода, буріння свердловин, бурение скаважин, замовлення послуги, форма зворотного зв'язку, послуги "} />
            <link rel="canonical" href={canonicalUrl} />
            {/* social metadata */}
            
            <meta property="og:type" content="product"/>
            <meta property="og:title" content={"Послуга "+ serviceData.title.toLowerCase() +" | New Water"} />
            <meta property="og:description" content={serviceData.shortDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="product:price:amount" content={serviceData.minPrice} />
            <meta property="product:price:currency" content="UAH" />

            <meta property="og:image:alt" content="Візитка для сторінки послуг" />

            <meta name="twitter:card" content="product" />
            <meta name="twitter:title" content={"Послуга "+ serviceData.title.toLowerCase() +" | New Water"} />
            <meta name="twitter:description" content={serviceData.shortDescription} />
            <meta name="twitter:image" content={"/assets/openGraph/services/"+ idFromUrl +".png"} />
            <meta name="twitter:label1" content="Ціна" />
            <meta name="twitter:data1" content={serviceData.minPrice} />
            <meta name="twitter:url" content={canonicalUrl} />
          </Helmet>
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
          <Product serviceData={serviceData} canonicalUrl={canonicalUrl}/>
        </>
      )}
    </HelmetProvider>
  )               
}

export default ServicePage;