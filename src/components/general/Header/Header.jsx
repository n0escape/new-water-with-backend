import s from './Header.module.css';
import fonts from '../../../generalStyles/Fonts.module.css';
import { Link } from 'react-router-dom';

import PhoneNumbers from '../PhoneNumbers/PhoneNumbers';
import NavLinks from '../NavLinks/NavLinks'
import { useState } from 'react';

const Header = ({langs, currLang, setLanguage, logo, contactsIcon, contacts}) => {

  const [navExpanded, setNavExpanded] = useState(false);
  const [contactsExpanded, setContactsExpanded] = useState(false);

  const toggleNav = () => {
    setContactsExpanded(false); //закрытие блока контактов
    setNavExpanded(!navExpanded); // открытие/закрытие блока якорей
  };
  const toggleContacts = () => {
    setNavExpanded(false); //закрытие блока якорей
    setContactsExpanded(!contactsExpanded); // открытие/закрытие блока контактов
  }

  return (
      <header id={s.pageHeader}>
        <div className={`${s.item} ${s.logo}`}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + logo.src}
              alt={logo.alt}
              title={logo.alt}
            />
          </Link>
        </div>
        
        <div className={`${s.item} ${s.btnContainer}`}>
          <div className={`${s.toggleNav} ${navExpanded ? s.active : ''}`} onClick={toggleNav}>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
          </div>
          <div className={`${s.toggleContacts} ${contactsExpanded ? s.active : ''}`} onClick={toggleContacts}>
            <img src={process.env.PUBLIC_URL + contactsIcon.src} alt={contactsIcon.alt} />
          </div>
        </div>

        <div className={`${s.item} ${s.nav} ${navExpanded ? s.expanded : ''}`}>
          <NavLinks context={'header'} currLang={currLang} toggleNav={toggleNav}/>
        </div>

        <div className={`${s.item} ${s.contactsBlock} ${contactsExpanded ? s.expanded : ''}`}>
          <PhoneNumbers context={'header'} phoneNumbersList={contacts.phoneNumbers} toggleContacts={toggleContacts}/>
          <div className={s.schedule}>
            <p className={fonts.labelS}>{contacts.schedule}</p>
          </div>
        </div>
      </header>
    )
}

export default Header;