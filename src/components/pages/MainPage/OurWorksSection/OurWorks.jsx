import s from './OurWorks.module.css'
import MapFrame from '../../../imported/Map/Map';
import OurWorksList from './../../../general/OurWorksList/OurWorksList';

const OurWorks = ({ourWorks}) => (
    <section id={s.ourWorks}>
        <h1>Виконані замовлення</h1>
        <MapFrame content='works' markers={ourWorks}/>
        <OurWorksList ourWorks={ourWorks}/>
    </section>
)

export default OurWorks