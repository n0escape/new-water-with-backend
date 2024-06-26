import s from './NavLinks.module.css'
import classNames from 'classnames';
import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = ({context, toggleNav}) => {
    const linksClass = classNames(s.links, {
        [s.header]: context === 'header',
        [s.footer]: context === 'footer',
    });

    return (
        <ul className={linksClass}>
            <li>
                <Link to="/#anchorAboutUs" onClick={ () => toggleNav && toggleNav() } title='Про компанію'>Про компанію</Link>
            </li>
            <li>
                <Link to="/#anchorServices" onClick={ () => toggleNav && toggleNav() } title='Послуги'>Послуги</Link>
            </li>
            <li>
                <Link to="/#anchorOurWorks" onClick={ () => toggleNav && toggleNav() } title='Наші роботи'>Наші роботи</Link>
            </li>
            <li>
                <Link to="/#anchorContacts" onClick={ () => toggleNav && toggleNav() } title='Контакти'>Контакти</Link>
            </li>
        </ul>
    )
}

export default NavLinks