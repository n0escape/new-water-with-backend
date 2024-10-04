import s from './Materials.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import { useContext } from 'react';
import { CommonTranslationsContext } from '../../../../App';

const Materials = ({materials}) => {
    const commonTranslations = useContext(CommonTranslationsContext);
    return(
        <section id={s.materials}>
            <h2 className={fonts.headerL}>{commonTranslations.sectionsHeaders.materials.main}</h2>
            <div className={s.details}>
                <div className={s.imagesSet}>
                    {materials.photos.map( (elem, index) => (
                        <img src={process.env.PUBLIC_URL + elem.imageSrc}
                        alt={elem.title}
                        title={elem.title}
                        key={index} />
                    ))}
                </div>
                <div className={s.info}>
                    <p className={fonts.textMRegular}>{materials.description}</p>
                    <div className={s.advantages}>
                        <p className={fonts.textMBold}>{commonTranslations.headersInText.materials.advantages}</p>
                        <ul>
                            {materials.advantages.map( (elem, index) => (
                                <li className={fonts.textMRegular} key={index}>
                                    {elem.title}    
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className={fonts.textMBold}>
                        {commonTranslations.headersInText.materials.important}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Materials