import classNames from 'classnames';
import s from './PhoneNumbers.module.css';
import fonts from '../../../generalStyles/Fonts.module.css'
import React from 'react';

const PhoneNumbers = ({context, phoneNumbersList, toggleContacts}) => {

  function stylizePhoneNumber(phone) {
    // Удаление всех символов, кроме цифр
    const cleanedPhone = phone.replace(/\D/g, '');
    // Применение шаблона к номеру
    const formattedPhone = cleanedPhone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
    return formattedPhone;
  }

  const listClass = classNames(s.numbersList, {
    [s.header]: context === 'header',
    [s.contacts]: context === 'contacts',
    [s.footer]: context === 'footer',
  });
  const textClass = classNames({
    [fonts.textL]: context === 'contacts',
    [fonts.textMRegular]: context === 'footer' || context === 'header',
  });

  const handleClick = () => toggleContacts && toggleContacts()

  return (
    <ul className={listClass}>
      {phoneNumbersList.map( (phone, index) => (
        <li key={index}>
          <a 
            className={textClass} 
            href={`tel:${phone.url}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleClick} 
            title={`${phone.title} ${index+1}`}
          >
            {stylizePhoneNumber(phone.url)}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default PhoneNumbers;