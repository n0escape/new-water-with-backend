import { Link, useParams } from 'react-router-dom';
import ContactForm from '../../imported/ContactForm/ContactForm';
import s from './OrderPage.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../../../App';

const OrderPage = ({servicesList}) => {
    const { idService } = useParams();
    const service = servicesList.find(service => service.serviceId === idService)?.serviceName.toLowerCase();
    const canonicalUrl = `${baseUrl}/order/${idService}`;
    
    return (
        
    <HelmetProvider>
        <Helmet>
            <title>Замовлення послуги {service} | New Water</title>
            <meta name="description" content="Замовляйте наші послуги прямо зараз, через форму зворотного зв'язку на сайті компанії." />
            <meta name="keywords" content={service + ", new water, нова вода, новая вода, буріння свердловин, бурение скаважин, замовлення послуги, форма зворотного зв'язку, послуги"} />
            <link rel="canonical" href={canonicalUrl} />
            {/* social metadata */}
            <meta property="og:title" content={"Замовлення послуги "+ service +" | New Water"} />
            <meta property="og:description" content="Замовляйте наші послуги прямо зараз, через форму зворотного зв'язку на сайті компанії." />
            <meta property="og:url" content={canonicalUrl} /> 

            <meta property="og:image:alt" content="Візитка для сторінки замовлення" />

            <meta name="twitter:title" content={"Замовлення послуги "+ service +" | New Water"} />
            <meta name="twitter:description" content="Замовляйте наші послуги прямо зараз, через форму зворотного зв'язку на сайті компанії." />
        </Helmet>
        <div className={s.orderPage}>
            <div className={s.header}>
                <h1 className={fonts.headerL}>Замовити послугу</h1>
            </div>
            <div className={s.orderPageContent}>
                <ContactForm servicesList={servicesList} selectedService={idService} />
                <div className={s.moveBack}>
                    <Link className={fonts.textL} to="/#anchorServices">Повернутись до списку послуг</Link>
                </div>
            </div>
        </div>
    </HelmetProvider>
    )
}

export default OrderPage;