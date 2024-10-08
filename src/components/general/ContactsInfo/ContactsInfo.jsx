import s from './ContactsInfo.module.css';
import fonts from '../../../generalStyles/Fonts.module.css'
import classNames from 'classnames';
import MailAddresses from '../MailAddresses/MailAddresses';
import PhoneNumbers from '../PhoneNumbers/PhoneNumbers';
import React from 'react';

const ContactsInfo = ({context, contacts}) => {
    const listClass = classNames(s.contactsContainer, {
        [s.contacts]: context === 'contacts',
        [s.footer]: context === 'footer',
    });
    const textClass = classNames({
        [fonts.textL]: context === 'contacts',
        [fonts.labelS]: context === 'footer',
    });
    return (
        <div className={listClass}>
            {/* 
            <div className={s.officesInfo}>
                {contacts.offices.map((office, index) => (
                    <p key={index} title={`Офіс ${index+1}`}>{office.address}</p>
                ))}
            </div> 
            */}
            <PhoneNumbers context={context} phoneNumbersList={contacts.phoneNumbers} />
            <MailAddresses context={context} mailAddressesList={contacts.mailAddresses} />
            <div className={s.schedule}>
                <p className={textClass}>{contacts.schedule}</p>
            </div>
        </div>
    )
}

export default ContactsInfo