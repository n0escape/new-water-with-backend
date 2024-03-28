import s from './Footer.module.css'
import SocialMedias from '../SocialMedias/SocialMedias'
import NavLinks from '../NavLinks/NavLinks';
import ContactsInfo from '../ContactsInfo/ContactsInfo';

const Footer = ({logo, contacts}) => {
    return (
      <footer id={s.pageFooter}>
        <div className={s.container}>

          <div className={s.logo}>
            <img className={s.logoIcon} 
              src={process.env.PUBLIC_URL + logo} 
              alt="Company logo" width="150px" />
          </div>

          <div className={s.nav}>
            <h2>Навігація</h2>
            <NavLinks context={'footer'}/>
          </div>

          <div className={s.contacts}>
            <h2>Контакти</h2>
            <ContactsInfo context={'footer'} contacts={contacts}/>
          </div>

          <div className={s.socialMedias}>
            <h2>Соціальні мережі</h2>
            <SocialMedias context={'footer'} socialMediasList={contacts.socialMedias} />
          </div>
        </div>
        <div className={s.rights}>
          <p>© 2024 New water | All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer;