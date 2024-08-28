import './App.css';
import './generalStyles/Fonts.module.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const baseUrl = 'https://new-water.vercel.app';
export const basePathData = process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : baseUrl;

const App = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  const getServicesList = (services) => {
    let servicesList = [
      {serviceId: 'contactMe', serviceName: 'Зв\'яжіться зі мною'},
      {serviceId: 'question', serviceName: 'Задати питання'}
    ];
    services.map(service => (
      servicesList.push({serviceId: service.id, serviceName: service.title})
    ))
    return servicesList
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(basePathData + '/data.json');
        const data = await response.json();

        setData(data);
        setServicesList(getServicesList(data.services))
        // autofill sitemap.xml
        // generateSitemap(data.services);
      } finally {
        setLoading(false);
        pageUpTrick();
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta property="og:locale" content="uk_UA"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Вебсайт компанії New Water" />

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
      <>
        <Router>
          <ScrollToHash />
          <ScrollToTop toTopIcon={data.generalIcons.toTopIcon} />
          <Header logo={data.generalIcons.logo} contactsIcon={data.generalIcons.callIcon} contacts={data.contacts}/>
          <div className="pageContent">
            <Routes>
              <Route exact path="/" element={<MainPage aboutUs={data.aboutUs} services={data.services} materials={data.materials} ourWorks={data.ourWorks} servicesList={servicesList} contacts={data.contacts}/>} />
              <Route path="/service/:idFromUrl" element={<ServicePage services={data.services}/>} />
              <Route path="/order/:idService" element={<OrderPage servicesList={servicesList} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer logo={data.generalIcons.logo} contacts={data.contacts}/>
          <BreadcrumbList />
          <LocalBusiness data={data}/>
        </Router>
      </>
    </HelmetProvider>
  );
}

export default App;