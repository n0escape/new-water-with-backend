import s from './MainPage.module.css';

import AboutUs from './AboutUsSection/AboutUs.jsx';
import Services from './ServicesSection/Services.jsx';
import OurWorks from './OurWorksSection/OurWorks.jsx';
import ContactUs from './ContactUsSection/ContactUs.jsx';
import Contacts from './ContactsSection/Contacts';

const MainPage = ({aboutUs, services, ourWorks, servicesList, contacts}) => {
  
  return (
    <div className={s.generalOutput}>

      <div id="anchorAboutUs" className={s.anchorAboutUs}></div>
      <AboutUs aboutUs={aboutUs}/>

      <div id="anchorServices" className={s.anchorServices}></div>
      <Services services={services}/>

      <div id="anchorOurWorks" className={s.anchorOurWorks}></div>
      <OurWorks ourWorks={ourWorks}/>

      <div id="anchorContactUs" className={s.anchorContactUs}></div>
      <ContactUs servicesList={servicesList}/>

      <div id="anchorContacts" className={s.anchorContacts}></div>
      <Contacts contacts={contacts} />    
    </div>
  );
}

export default MainPage;