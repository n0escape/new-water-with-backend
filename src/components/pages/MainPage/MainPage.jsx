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

const MainPage = ({ metaTrans, lang, aboutUs, services, materials, ourWorks, servicesList, contacts }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{metaTrans.mainPage.title}</title>
        <meta name="description" content={metaTrans.mainPage.description} />
        <meta name="keywords" content={"new water, " + metaTrans.mainPage.keywords}/>
        <link rel="canonical" href={`${baseUrl}/${lang}`} />
        {/* social metadata */}
        <meta property="og:title" content={metaTrans.mainPage.title} />
        <meta property="og:description" content={metaTrans.mainPage.description} />
        <meta property="og:url" content={`${baseUrl}/${lang}`} /> 

        <meta property="og:image:alt" content={metaTrans.mainPage.ogImageAlt} />

        <meta name="twitter:title" content={metaTrans.mainPage.title} />
        <meta name="twitter:description" content={metaTrans.mainPage.description} />
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