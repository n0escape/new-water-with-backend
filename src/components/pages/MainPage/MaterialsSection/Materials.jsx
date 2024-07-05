import s from './Materials.module.css'

const Materials = ({materials}) => (
    <section id={s.materials}>
        <div>
            <h1>Матеріали</h1>
        </div>
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
                <p>{materials.description}</p>
                <div className={s.advantages}>
                    <p className={s.titleAdvantanges}>Переваги обсадної труби ПВХ:</p>
                    <ul>
                        {materials.advantages.map( (elem, index) => (
                            <li key={index}>{elem.title}</li>
                        ))}
                    </ul>
                </div>
                <p className={s.importantInfo}>! Уся продукція сертифікована та відповідає нормам СЕС України.</p>
            </div>
        </div>
    </section>
)

export default Materials