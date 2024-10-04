import s from './Footer.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'
import SocialMedias from '../SocialMedias/SocialMedias'
import NavLinks from '../NavLinks/NavLinks';
import ContactsInfo from '../ContactsInfo/ContactsInfo';
import { useContext } from 'react';
import { CommonTranslationsContext } from '../../../App';

const Footer = ({logo, contacts}) => {
  const commonTranslations = useContext(CommonTranslationsContext);
    return (
      <footer id={s.pageFooter}>
        <div className={s.container}>

          <div className={s.logo}>
            <img className={s.logoIcon} 
              src={process.env.PUBLIC_URL + logo.src}
              alt={logo.alt}
              title={logo.alt}
            />
          </div>

          <div className={s.nav}>
            <h2 className={fonts.titleM}>{commonTranslations.footerHeaders.nav}</h2>
            <NavLinks context={'footer'}/>
          </div>

          <div className={s.contacts}>
            <h2 className={fonts.titleM}>{commonTranslations.footerHeaders.contacts}</h2>
            <ContactsInfo context={'footer'} contacts={contacts}/>
          </div>

          <div className={s.socialMedias}>
            <h2 className={fonts.titleM}>{commonTranslations.footerHeaders.socialMedias}</h2>
            <SocialMedias context={'footer'} socialMediasList={contacts.socialMedias} />
          </div>
        </div>
        {/*
        <div className={s.rights}>
          <p>© 2024 New water | All Rights Reserved</p>
        </div>
        */}
      </footer>
  )
}

export default Footer;