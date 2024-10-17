import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import s from './ServicePage.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'
import Gallery from '../../general/Gallery/Gallery';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl, CommonTranslationsContext } from '../../../App';
import Product from '../../microMarkups/Product';
import ImageGallery from '../../microMarkups/ImageGallery';
import { useTranslation } from 'react-i18next';

const ServicePage = ({metaTrans, lang, services, currLang}) => {

  const commonTranslations = useContext(CommonTranslationsContext);

  const { idFromUrl } = useParams();
  const [serviceData, setServiceData] = useState(null);
  useEffect(() => {
    setServiceData( services.find(item => item.id === idFromUrl) )
  }, [services, idFromUrl]);
  const canonicalUrl = `${baseUrl}/${lang}/service/${idFromUrl}`;
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      {serviceData && (
        <>
          <Helmet>
            <title>
            { t(metaTrans.servicePage.title, { serviceName: serviceData.title.toLowerCase() }) }
            </title>
            <meta name="description" content={serviceData.description.join(' ')} />
            <meta name="keywords" content={ t(metaTrans.servicePage.keywords, { serviceName: serviceData.title.toLowerCase() }) } />
            <link rel="canonical" href={canonicalUrl} />
            {/* social metadata */}
            
            <meta property="og:type" content="product"/>
            <meta property="og:title" content={ t(metaTrans.servicePage.title, { serviceName: serviceData.title.toLowerCase() }) } />
            <meta property="og:description" content={serviceData.description.join(' ')} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="product:price:amount" content={serviceData.minPrice} />
            <meta property="product:price:currency" content="UAH" />

            <meta property="og:image:alt" content={metaTrans.servicePage.ogImageAlt} />

            <meta name="twitter:card" content="product" />
            <meta name="twitter:title" content={ t(metaTrans.servicePage.title, { serviceName: serviceData.title.toLowerCase() }) } />
            <meta name="twitter:description" content={serviceData.description.join(' ')} />
            <meta name="twitter:image" content={"/assets/openGraph/services/"+ idFromUrl +".png"} />
            <meta name="twitter:label1" content="Ціна" />
            <meta name="twitter:data1" content={serviceData.minPrice} />
            <meta name="twitter:url" content={canonicalUrl} />
          </Helmet>
          <div className={s.servicePage}>
            <div className={s.serviceBox}>
              <h1 className={fonts.headerL}>{serviceData.title}</h1>
              <div className={s.serviceDetails}>
                <div className={s.serviceDescription}>
                  {serviceData.description.map((text, index) => (
                    <p className={fonts.textMRegular} key={index}>
                      {text}
                    </p>
                  ))}
                  <p className={s.slogan}>
                    {commonTranslations.sevicePage.slogan.map((item, index) => <span key={index} className={fonts.textMRegular}>{item}</span>)}
                  </p>
                </div>
                <div className={s.list}>
                  <h4 className={fonts.textMBold}>{commonTranslations.headersInText.servicePage.contents}</h4>
                  <ul>
                    {serviceData.contents.map((point, index) => (
                      <li className={fonts.textMRegular} key={index}>
                        {point.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.list}>
                  <h4 className={fonts.textMBold}>{commonTranslations.headersInText.servicePage.whatYouWillGet}</h4>
                  <ul>
                    {serviceData.whatYouWillGet.map((point, index) => (
                      <li className={fonts.textMRegular} key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={s.aditionalBox}>
              <div className={s.priceInfo}>
                <h4 className={fonts.headerS}>{commonTranslations.headersInText.servicePage.priceHeader}</h4> 
                { serviceData.minPrice !== null
                  ? <p className={fonts.textMRegular}>
                      {commonTranslations.services.pricePreposition}&nbsp;
                      <span className={fonts.price}>{serviceData.minPrice}</span>
                    </p>
                  : <span className={fonts.price}>{commonTranslations.services.agreedPrice}</span>
                }
              </div>
              <Gallery photosList={serviceData.photos} />
              <div className={s.toServicesBtn}>
                <Link className={fonts.labelLSemiBold} to={`/${currLang}/order/${serviceData.id}`}>
                  {commonTranslations.buttons.servicePageToOrder}
                </Link>
              </div>
            </div>
          </div>
          { serviceData.minPrice
            ? <Product serviceData={serviceData} canonicalUrl={canonicalUrl}/>
            : null
          }
          <ImageGallery context={'service'} photoList={serviceData.photos}/>
        </>
      )}
    </HelmetProvider>
  )               
}

export default ServicePage;