import s from './Materials.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'

const Materials = ({materials}) => (
    <section id={s.materials}>
        <h1 className={fonts.headerL}>Матеріали</h1>
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
                    <p className={fonts.textMBold}>Переваги обсадної труби ПВХ:</p>
                    <ul>
                        {materials.advantages.map( (elem, index) => (
                            <li className={fonts.textMRegular} key={index}>
                                {elem.title}    
                            </li>
                        ))}
                    </ul>
                </div>
                <p className={fonts.textMBold}>! Уся продукція сертифікована та відповідає нормам СЕС України.</p>
            </div>
        </div>
    </section>
)

export default Materials