import ContactForm from '../../../imported/ContactForm/ContactForm'
import s from './ContactUs.module.css'

const ContactUs = ({servicesList}) => (
    <section id={s.contactUs}>
        <div className={s.header}>
            <h1>Маєте запитання чи бажаєте замовити послугу?</h1>
            <h2>Тоді просто залиште свою заявку через форму...</h2>
        </div>
        <ContactForm servicesList={servicesList}/>
    </section>
)

export default ContactUs