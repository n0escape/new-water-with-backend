//import MapFrame from '../../../imported/Map/Map'
import ContactsInfo from '../../../general/ContactsInfo/ContactsInfo'
import SocialMedias from '../../../general/SocialMedias/SocialMedias'
import s from './Contacts.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'

const Contacts = ({contacts}) => (
    <section id={s.contacts}>
        <div className={s.header}>
          <h2 className={fonts.headerM}>
            ...або зв'яжіться з нами за наступними контактами
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

export default Contacts