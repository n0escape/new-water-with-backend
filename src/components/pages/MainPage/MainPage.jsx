import React from 'react';
import s from './MainPage.module.css';
import AboutUs from './AboutUsSection/AboutUs.jsx';
import Services from './ServicesSection/Services.jsx';
import OurWorks from './OurWorksSection/OurWorks.jsx';
import ContactUs from './ContactUsSection/ContactUs.jsx';
import Contacts from './ContactsSection/Contacts';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../../../App.js';

const MainPage = ({ aboutUs, services, ourWorks, servicesList, contacts }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Головна | New Water</title>
        <meta name="description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
        <meta name="keywords" content="new water, нова вода, новая вода, послуги, буріння свердловин, бурение скаважин, Харків, Харьков, Харків та область, Харьков и область, Харківська область, Харьковская область," />
        <link rel="canonical" href={baseUrl} />
        {/* social metadata */}
        <meta property="og:title" content="Головна | New Water" />
        <meta property="og:description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
        <meta property="og:url" content={baseUrl} /> 

        <meta property="og:image:alt" content="Візитка для головнної сторінки" />

        <meta name="twitter:title" content="Головна | New Water" />
        <meta name="twitter:description" content="Дізнайтесь більше про компанію, послуги, які ми надаємо, та ознайомтеся з нашими успішними проектами. Зв'яжіться з нами для отримання детальної інформації." />
      </Helmet>
      <div className={s.generalOutput}>
        <div id="anchorAboutUs" className={s.anchorAboutUs}></div>
        <AboutUs aboutUs={aboutUs} />

        <div id="anchorServices" className={s.anchorServices}></div>
        <Services services={services} />

        <div id="anchorOurWorks" className={s.anchorOurWorks}></div>
        <OurWorks ourWorks={ourWorks} />

        <div id="anchorContactUs" className={s.anchorContactUs}></div>
        <ContactUs servicesList={servicesList} />

        <div id="anchorContacts" className={s.anchorContacts}></div>
        <Contacts contacts={contacts} />
      </div>
    </HelmetProvider>
  );
}

export default MainPage;