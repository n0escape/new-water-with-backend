import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/NotFound/NotFound.jsx';
import MainPage from './components/pages/MainPage/MainPage.jsx';
import ServicePage from './components/pages/ServicePage/ServicePage.jsx';
import OrderPage from './components/pages/OrderPage/OrderPage.jsx';
import Header from './components/general/Header/Header.jsx';
import Footer from './components/general/Footer/Footer.jsx';
import BreadcrumbList from './components/microMarkups/BreadcrumbList.jsx';
import LocalBusiness from './components/microMarkups/LocalBusiness.jsx';
import pageUpTrick from './utils/pageUpTrick.js';

import ScrollToHash from './utils/scrollToHash.js';
import ScrollToTop from './components/general/ScrollToTop/ScrollToTop.jsx';
import { useEffect, useState } from 'react';
import LoaderPage from './components/pages/LoaderPage/LoaderPage.jsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const baseUrl = 'https://new-water.vercel.app';
export const basePath = process.env.NODE_ENV === 'development' ? '/' : '/';
export const basePathData = process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : '/';

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
      <div>
        <Router basename={basePath}>
          <ScrollToHash />
          <ScrollToTop toTopIcon={data.generalIcons.toTopIcon} />
          <Header logo={data.generalIcons.logo} contactsIcon={data.generalIcons.callIcon} contacts={data.contacts}/>
          <Routes>
            <Route exact path="/" element={<MainPage aboutUs={data.aboutUs} services={data.services} ourWorks={data.ourWorks} servicesList={servicesList} contacts={data.contacts}/>} />
            <Route path="/service/:idFromUrl" element={<ServicePage services={data.services}/>} />
            <Route path="/order/:idService" element={<OrderPage servicesList={servicesList} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer logo={data.generalIcons.logo} contacts={data.contacts}/>
          <BreadcrumbList />
          <LocalBusiness data={data}/>
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;