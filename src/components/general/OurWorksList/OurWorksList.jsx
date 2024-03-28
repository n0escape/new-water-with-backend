import React, { useState } from 'react';
import s from './OurWorksList.module.css';

const OurWorksList = ({ ourWorks }) => {
    const [visibleWorks, setVisibleWorks] = useState(4);
    const [fade, setFade] = useState(true); // true = in, false = out

    const showMoreWorks = () => {
        setVisibleWorks(prev => prev + 2);
        setFade(true);
    };

    const showLessWorks = () => {
        setFade(false);
        setTimeout(() => {
            setVisibleWorks(4);
        }, 1500);
    };

    return (
        <div className={s.worksContainer}>
            <div className={s.worksList}>
                {ourWorks.slice(0, visibleWorks).map((work, index) => (
                    <div key={work.title} className={`${s.workItem} ${index < 4 ? '' : (index >= 4 && fade ? s.fadeIn : s.fadeOut)}`}>
                        <div className={s.workItemContent}>
                            <div className={s.workImage}>
                                <img src={process.env.PUBLIC_URL + work.imageSrc} alt={work.title} />
                            </div>
                            <div className={s.itemDetails}>
                                <div className={s.itemHeader}>
                                    <h3>{work.title}</h3>
                                    <p className={`${s.address} ${work.address === null ? s.hidden : ''}`}>{work.address}</p>
                                    <p className={`${s.date} ${work.date === null ? s.hidden : ''}`}>{work.date}</p>
                                </div>
                                <div className={s.itemDescription}>
                                    <p>{work.description}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <div className={s.btnContainer}>
                {ourWorks.length > visibleWorks && (
                    <div className={s.moreBtnContainer}>
                        <button className={s.moreBtn} onClick={showMoreWorks}>
                            Більше
                        </button>
                    </div>
                )}
                {visibleWorks > 4 && (
                    <div className={s.lessBtnContainer}>
                        <button className={s.lessBtn} onClick={showLessWorks}>
                            Згорнути
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurWorksList;
