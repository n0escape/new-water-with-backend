import s from './NavLinks.module.css'
import fonts from '../../../generalStyles/Fonts.module.css';
import classNames from 'classnames';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CommonTranslationsContext } from '../../../App';

const NavLinks = ({context, currLang, toggleNav}) => {
    const commonTranslations = useContext(CommonTranslationsContext);

    const linksClass = classNames(s.links, {
        [s.header]: context === 'header',
        [s.footer]: context === 'footer',
    });
    const textClass = classNames({
        [fonts.labelM]: context === 'header',
        [fonts.textMRegular]: context === 'footer',
    });

    return (
        <ul className={linksClass}>
            {commonTranslations.navLinks.map(link => 
                Object.entries(link).map(( [key, val], index ) =>
                    <li key={index}>
                        <Link 
                            className={textClass} 
                            to={`${currLang}/#${key}`} 
                            onClick={ () => toggleNav && toggleNav() } 
                            title={`${val}`}>{val}
                        </Link>
                    </li>
                )
            )}
        </ul>
    )
}

export default NavLinks