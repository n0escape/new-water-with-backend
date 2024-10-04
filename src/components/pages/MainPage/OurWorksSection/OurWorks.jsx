import s from './OurWorks.module.css'
import fonts from '../../../../generalStyles/Fonts.module.css'
import MapFrame from '../../../imported/Map/Map';
import OurWorksList from './../../../general/OurWorksList/OurWorksList';
import { useContext } from 'react';
import { CommonTranslationsContext } from '../../../../App';

const OurWorks = ({ourWorks}) => {
    const commonTranslations = useContext(CommonTranslationsContext);
    return (
        <section id={s.ourWorks}>
            <h2 className={fonts.headerL}>{commonTranslations.sectionsHeaders.ourWorks.main}</h2>
            <MapFrame content='works' markers={ourWorks}/>
            <OurWorksList ourWorks={ourWorks}/>
        </section>
    )
}

export default OurWorks