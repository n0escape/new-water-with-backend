import ContactForm from '../../../imported/ContactForm/ContactForm'
import s from './ContactUs.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'

const ContactUs = ({servicesList}) => (
    <section id={s.contactUs}>
        <div className={s.header}>
            <h2 className={`${s.headerH1} ${fonts.headerL}`}>Маєте запитання чи бажаєте замовити послугу?</h2>
            <h2 className={fonts.headerM}>Тоді просто залиште свою заявку через форму...</h2>
        </div>
        <ContactForm servicesList={servicesList}/>
    </section>
)

export default ContactUs