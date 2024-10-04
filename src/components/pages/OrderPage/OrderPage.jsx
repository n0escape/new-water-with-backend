import { Link, useParams } from 'react-router-dom';
import ContactForm from '../../imported/ContactForm/ContactForm';
import s from './OrderPage.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl, CommonTranslationsContext } from '../../../App';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const OrderPage = ({metaTrans, lang, servicesList}) => {

    const commonTranslations = useContext(CommonTranslationsContext);

    const { idService } = useParams();
    const service = servicesList.find(service => service.serviceId === idService)?.serviceName.toLowerCase();
    const canonicalUrl = `${baseUrl}/${lang}/order/${idService}`;
    
     const { t } = useTranslation();
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>{ t(metaTrans.orderPage.title, { serviceName: service }) }</title>
                <meta name="description" content={metaTrans.orderPage.description} />
                <meta name="keywords" content={`${service}, ${metaTrans.orderPage.keywords}`} />
                <link rel="canonical" href={canonicalUrl} />
                {/* social metadata */}
                <meta property="og:title" content={ t(metaTrans.orderPage.title, { serviceName: service }) } />
                <meta property="og:description" content={metaTrans.orderPage.description} />
                <meta property="og:url" content={canonicalUrl} /> 

                <meta property="og:image:alt" content={metaTrans.orderPage.ogImageAlt} />

                <meta name="twitter:title" content={ t(metaTrans.orderPage.title, { serviceName: service }) } />
                <meta name="twitter:description" content={metaTrans.orderPage.description} />
            </Helmet>
            <div className={s.orderPage}>
                <div className={s.header}>
                    <h1 className={fonts.headerL}>{commonTranslations.orderPage.header}</h1>
                </div>
                <div className={s.orderPageContent}>
                    <ContactForm servicesList={servicesList} selectedService={idService} />
                    <div className={s.moveBack}>
                        <Link className={fonts.textL} to="/#anchorServices">{commonTranslations.orderPage.anchorServices}</Link>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default OrderPage;