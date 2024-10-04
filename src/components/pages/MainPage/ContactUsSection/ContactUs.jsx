import ContactForm from '../../../imported/ContactForm/ContactForm'
import s from './ContactUs.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { useContext } from 'react';
import { CommonTranslationsContext } from '../../../../App';

const ContactUs = ({servicesList}) => {
    const commonTranslations = useContext(CommonTranslationsContext);
    return (
        <section id={s.contactUs}>
            <div className={s.header}>
                <h2 className={`${s.headerH1} ${fonts.headerL}`}>
                    {commonTranslations.sectionsHeaders.contactUs.main}
                </h2>
                <h2 className={fonts.headerM}>
                    {commonTranslations.sectionsHeaders.contactUs.additional}
                </h2>
            </div>
            <ContactForm servicesList={servicesList}/>
        </section>
    )
}

export default ContactUs