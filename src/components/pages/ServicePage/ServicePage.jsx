import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import s from './ServicePage.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'
import Gallery from '../../general/Gallery/Gallery';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../../../App';
import Product from '../../microMarkups/Product';
import ImageGallery from '../../microMarkups/ImageGallery';

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
                <h1 className={fonts.headerL}>{serviceData.title}</h1>
              </div>
              <div className={s.serviceDetails}>
                <div className={s.serviceDescription}>
                  {serviceData.description.map((text, index) => (
                    <p className={fonts.textMRegular} key={index}>
                      {text}
                    </p>
                  ))}
                  <p className={`${fonts.textMRegular} ${s.slogan}`}>
                    Буріння свердловини на воду – найкраще вирішення проблеми водопостачання будинків, де відсутнє централізоване водопостачання. Ви не будете залежити від постачальників води, тому що свердловина на воду- це Ваша власність.
                    <br/>Ми допоможемо Вам обрати самий оптимальний варіант, який відповідає Вашим запитам.
                    <br/>Ми працюємо на результат!
                  </p>
                </div>
                <div className={s.list}>
                  <h4 className={fonts.textMBold}>З чого формується ціна:</h4>
                  <ul>
                    {serviceData.contents.map((point, index) => (
                      <li className={fonts.textMRegular} key={index}>
                        {point.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.list}>
                  <h4 className={fonts.textMBold}>Що ви отримаєте в результаті:</h4>
                  <ul>
                    {serviceData.whatYouWillGet.map((point, index) => (
                      <li className={fonts.textMRegular} key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={s.aditionalBox}>
              <div className={s.toOrderBox}>
                <div className={s.orderInfo}>
                  <h1>Вартість</h1> 
                  { serviceData.minPrice !== null
                    ? <p>від <strong>{serviceData.minPrice}</strong></p>
                    : <p>Договірна</p>
                  }
                </div>
                <div className={s.toServicesBtn}>
                  <Link to={`/order/${serviceData.id}`}>
                    Зв'язатись з нами
                  </Link>
                </div>
              </div>
              <Gallery photosList={serviceData.photos} />
            </div>
          </div>
          <Product serviceData={serviceData} canonicalUrl={canonicalUrl}/>
          <ImageGallery context={'service'} photoList={serviceData.photos}/>
        </>
      )}
    </HelmetProvider>
  )               
}

export default ServicePage;