import React, { useContext, useState } from 'react';
import s from './OurWorksList.module.css';
import fonts from '../../../generalStyles/Fonts.module.css'
import { CommonTranslationsContext } from '../../../App';

const OurWorksList = ({ ourWorks }) => {

    const commonTranslations = useContext(CommonTranslationsContext);

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
                    <div key={index} className={`${s.workItem} ${index < 4 ? '' : (index >= 4 && fade ? s.fadeIn : s.fadeOut)}`}>
                        <div className={s.workItemContent}>
                            <div className={s.workImage}>
                                <img
                                    src={process.env.PUBLIC_URL + work.imageSrc}
                                    alt={work.title}
                                    title={work.title}
                                />
                            </div>
                            <div className={s.itemDetails}>
                                <div className={s.itemHeader}>
                                    <h3 className={fonts.headerS}>{work.title}</h3>
                                    <p className={`${fonts.textL} ${s.address} ${work.address === null ? s.hidden : ''}`}>{work.address}</p>
                                    <p className={`${fonts.labelL} ${s.date} ${work.date === null ? s.hidden : ''}`}>{work.date}</p>
                                </div>
                                <div className={s.itemDescription}>
                                    <p className={fonts.textMRegular}>{work.description}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <div className={s.btnContainer}>
                {ourWorks.length > visibleWorks && (
                    <button className={`${fonts.labelS} ${s.moreBtn}`} onClick={showMoreWorks}>
                        {commonTranslations.buttons.ourWorksMore}
                    </button>
                )}
                {visibleWorks > 4 && (
                    <button className={`${fonts.labelS} ${s.lessBtn}`} onClick={showLessWorks}>
                        {commonTranslations.buttons.ourWorksLess}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OurWorksList;
