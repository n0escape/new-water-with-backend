import './App.css';
import './generalStyles/Fonts.module.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import i18n from './i18n';
import { useTranslation } from 'react-i18next';

import NotFound from './components/pages/NotFound/NotFound.jsx';
import MainPage from './components/pages/MainPage/MainPage.jsx';
import ServicePage from './components/pages/ServicePage/ServicePage.jsx';
import OrderPage from './components/pages/OrderPage/OrderPage.jsx';
import LoaderPage from './components/pages/LoaderPage/LoaderPage.jsx';

import Header from './components/general/Header/Header.jsx';
import Footer from './components/general/Footer/Footer.jsx';

import ScrollToTop from './components/general/ScrollToTop/ScrollToTop.jsx';
import BreadcrumbList from './components/microMarkups/BreadcrumbList.jsx';
import LocalBusiness from './components/microMarkups/LocalBusiness.jsx';

import pageUpTrick from './utils/pageUpTrick.js';
import ScrollToHash from './utils/scrollToHash.js';

// import generateSitemap from './utils/generateSitemap';

import { createContext, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const baseUrl = 'https://new-water.vercel.app';
export const basePathData = process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : baseUrl;

export const CommonTranslationsContext = createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [commonTrans, setCommonTrans] = useState([]);
  const [metaTrans, setMetaTrans] = useState([]);
  const [servicesList, setServicesList] = useState([]);
	const [language, setLanguage] = useState(i18n.language);
  useTranslation();
  const languages = i18n.options.supportedLngs.filter(lng => lng !== 'cimode');

	useEffect(() => {
		document.documentElement.lang = language;
    i18n.changeLanguage(language)		
	}, [language]);

  const getServicesList = (moreSeviceOptions, services) => {
    let servicesList = moreSeviceOptions;
    services.map(service => (
      servicesList.push({serviceId: service.id, serviceName: service.title})
    ))
    return servicesList
  }
  
  useEffect( () => {
    const fetchData = async () => {
      await i18n.loadNamespaces(['data', 'common', 'meta']);

      // load curr translations
      const allTranslations = i18n.getResourceBundle(language, 'data');
      const commonTranslations = i18n.getResourceBundle(language, 'common');
      const metaTranslations = i18n.getResourceBundle(language, 'meta');

      // console.log('curr lang:', language);
      // console.log('loaded data:', allTranslations);
      // console.log('loaded common:', commonTranslations);
      // console.log('loaded common:', metaTranslations);

      if (allTranslations && commonTranslations && metaTranslations) {
          setData(allTranslations);
          setCommonTrans(commonTranslations);
          setMetaTrans(metaTranslations)
          setServicesList(getServicesList(commonTranslations.form.moreSeviceOptions, allTranslations.services)); // Используем allTranslations
          // autofill sitemap.xml
          // generateSitemap(allTranslations.services);
          pageUpTrick();
      } else {
          console.log(`Translations for ${language} not loaded yet.`);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [language]);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <CommonTranslationsContext.Provider value={commonTrans}>
      <HelmetProvider>
        <Helmet>
          <meta property="og:locale" content="uk_UA" />
          <meta property="og:locale:alternate" content="ru_RU" />
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content={metaTrans.app.ogSiteName} />

          <meta property="og:image" content="/assets/openGraph/mobile.png" />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="315" />
          <meta property="og:image" content="/assets/openGraph/tablet.png" />
          <meta property="og:image:width" content="900" />
          <meta property="og:image:height" content="473" />
          <meta property="og:image" content="/assets/openGraph/laptop.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {/* Атрибут sizes для указания размеров изображения */}
          <meta property="og:image:sizes" content="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="/assets/openGraph/laptop.png" />
        </Helmet>
          <Router>
            <ScrollToHash />
            <ScrollToTop toTopIcon={data.generalIcons.toTopIcon} />
            <Header 
              langs={languages}
              currLang={i18n.language}
              setLanguage={setLanguage}
              logo={data.generalIcons.logo}
              contactsIcon={data.generalIcons.callIcon}
              contacts={data.contacts}
            />
            <div className="pageContent">
              <Routes>
                {/* Добавляем редирект для корневого пути */}
                <Route path="/" element={<Navigate to={`${language}`} />} />
                <Route path=":language">
                  <Route index element={<MainPage metaTrans={metaTrans} lang={language} aboutUs={data.aboutUs} services={data.services} materials={data.materials} ourWorks={data.ourWorks} servicesList={servicesList} contacts={data.contacts}/>} />
                  <Route path="service/:idFromUrl" element={<ServicePage metaTrans={metaTrans} lang={language} services={data.services} currLang={i18n.language}/>} />
                  <Route path="order/:idService" element={<OrderPage metaTrans={metaTrans} lang={language} servicesList={servicesList} />} />
                  
                  <Route path="404" element={<NotFound errorPage={data.errorPage}/>} />
                  <Route path="*" element={<NotFound errorPage={data.errorPage}/>} />
                </Route>
              </Routes>
            </div>
            <Footer logo={data.generalIcons.logo} contacts={data.contacts}/>
            <BreadcrumbList />
            <LocalBusiness data={data}/>
          </Router>
      </HelmetProvider>
    </CommonTranslationsContext.Provider>
  );
}

export default App;