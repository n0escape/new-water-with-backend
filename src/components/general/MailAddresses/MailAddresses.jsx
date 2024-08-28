import classNames from 'classnames';
import s from './MailAddresses.module.css';
import fonts from '../../../generalStyles/Fonts.module.css'
import React from 'react';

const MailAddresses = ({context, mailAddressesList}) => {
  const listClass = classNames(s.mailList, {
    [s.contacts]: context === 'contacts',
    [s.footer]: context === 'footer',
  });
  const textClass = classNames({
    [fonts.textL]: context === 'contacts',
    [fonts.textMRegular]: context === 'footer',
  });
  return (
    <ul className={listClass}>
      {mailAddressesList.map( (mail, index) => (
        <li key={index}>
          <a className={textClass} href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer" key={index} title={`Пошта ${index+1}`}>
            {mail}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MailAddresses;