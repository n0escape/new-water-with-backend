import { Link, useParams } from 'react-router-dom';
import ContactForm from '../../imported/ContactForm/ContactForm';
import s from './OrderPage.module.css'

const OrderPage = ({servicesList}) => {
    const { idService } = useParams();
    
    return (
        <div className={s.orderPage}>
            <div className={s.header}>
                <h1>Замовити послугу</h1>
            </div>
            <div className={s.orderPageContent}>
                <ContactForm servicesList={servicesList} selectedService={idService} />
                <div className={s.moveBack}>
                    <Link to="/#anchorServices">Повернутись до списку послуг</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;