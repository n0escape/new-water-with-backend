import classNames from 'classnames';
import s from './SocialMedias.module.css';
import React from 'react';

const SocialMedias = ({context, socialMediasList}) => {
  const listClass = classNames(s.smList, {
    [s.contacts]: context === 'contacts',
    [s.footer]: context === 'footer',
  });
  return (
    <ul className={listClass}>
      {socialMediasList.map( contact => (
        <li key={contact.id} className={s.contact}>
          <a href={`${contact.url}`} target="_blank" rel="noopener noreferrer" title={`${contact.id} посилання`}>
            <img src={process.env.PUBLIC_URL + contact.src} alt={contact.id}/>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialMedias;