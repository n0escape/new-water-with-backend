import React from 'react';
import s from './MainPage.module.css';
import AboutUs from './AboutUsSection/AboutUs.jsx';
import Services from './ServicesSection/Services.jsx';
import Materials from './MaterialsSection/Materials.jsx';
import OurWorks from './OurWorksSection/OurWorks.jsx';
import ContactUs from './ContactUsSection/ContactUs.jsx';
import Contacts from './ContactsSection/Contacts';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../../../App.js';
import ImageGallery from '../../microMarkups/ImageGallery.jsx';

const MainPage = ({ aboutUs, services, materials, ourWorks, servicesList, contacts }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Головна | New Water</title>
        <meta name="description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
        <meta name="keywords" content={
          "new water, " + 
          "нова вода, буріння свердловин, буріння свердловин Харків, буріння свердловин Харківська область, облаштування свердловин, облаштування свердловин Харків, облаштування свердлвин Харківська область, ремонт свердловин, ремонт свердловин Харків, ремонт свердловин Харківська область, установка насосів, установка насосів Харків, установка насосів Харківська область " +
          "новая вода, бурение скаважин, бурение скаважин Харьков, бурение скаважин Харьковская область, обустройство скважин, обустройство скважин Харьков, обустройство скважин Харьковская область, ремонт скважин, ремонт скважин Харьков, ремонт скважин Харьковская область, установка насосов, установка насосов Харьков, установка насосов Харьковская область"
        }/>
        <link rel="canonical" href={baseUrl} />
        {/* social metadata */}
        <meta property="og:title" content="Головна | New Water" />
        <meta property="og:description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
        <meta property="og:url" content={baseUrl} /> 

        <meta property="og:image:alt" content="Візитка для головнної сторінки" />

        <meta name="twitter:title" content="Головна | New Water" />
        <meta name="twitter:description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
      </Helmet>
      <>
        <div id="anchorAboutUs" className={s.anchorAboutUs}></div>
        <AboutUs aboutUs={aboutUs} />

        <div id="anchorServices" className={s.anchorServices}></div>
        <Services services={services} />

        <div id="anchorMaterials" className={s.anchorMaterials}></div>
        <Materials materials={materials} />

        <div id="anchorOurWorks" className={s.anchorOurWorks}></div>
        <OurWorks ourWorks={ourWorks} />

        <div id="anchorContactUs" className={s.anchorContactUs}></div>
        <ContactUs servicesList={servicesList} />

        <div id="anchorContacts" className={s.anchorContacts}></div>
        <Contacts contacts={contacts} />
      </>
      <ImageGallery context={'works'} photoList={ourWorks}/>
    </HelmetProvider>
  );
}

export default MainPage;