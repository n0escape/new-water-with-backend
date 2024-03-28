import classNames from 'classnames';
import s from './MailAddresses.module.css';
import React from 'react';

const MailAddresses = ({context, mailAddressesList}) => {
  const listClass = classNames(s.mailList, {
    [s.contacts]: context === 'contacts',
    [s.footer]: context === 'footer',
  });
  return (
    <ul className={listClass}>
      {mailAddressesList.map( (mail, index) => (
        <li key={index}>
          <a href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer" key={index}>
            {mail}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MailAddresses;