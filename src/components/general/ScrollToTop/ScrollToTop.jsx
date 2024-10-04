import s from './ScrollToTop.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

// import pageUp from './../../assets/general/pageUp.png';


const ScrollToTop = ({toTopIcon}) => {
  return (
    <div className={s.pageUp}>
        <Link to="#">
            <img src={process.env.PUBLIC_URL + toTopIcon.src} alt={toTopIcon.alt} title={toTopIcon.alt} width="48px" />
        </Link>
    </div>
  );
}

export default ScrollToTop;