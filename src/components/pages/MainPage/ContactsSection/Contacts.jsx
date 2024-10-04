//import MapFrame from '../../../imported/Map/Map'
import ContactsInfo from '../../../general/ContactsInfo/ContactsInfo'
import SocialMedias from '../../../general/SocialMedias/SocialMedias'
import s from './Contacts.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { useContext } from 'react'
import { CommonTranslationsContext } from '../../../../App'

const Contacts = ({contacts}) => {
  const commonTranslations = useContext(CommonTranslationsContext);
  return (
    <section id={s.contacts}>
      <div className={s.header}>
        <h2 className={fonts.headerM}>
          {commonTranslations.sectionsHeaders.contacts.additional}
        </h2>
      </div>
      <div className={s.contactsBox}>
        {/* <MapFrame content={'office'} markers={contacts.offices}/> */}
        <div className={s.contactsList}>
          <ContactsInfo context={'contacts'} contacts={contacts}/>
          <SocialMedias context={'contacts'} socialMediasList={contacts.socialMedias} />
        </div>
      </div>
    </section>
  )
}

export default Contacts