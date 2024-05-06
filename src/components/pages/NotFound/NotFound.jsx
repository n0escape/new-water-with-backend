import { Link } from 'react-router-dom';
import s from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={s.notFound}>
            <div className={s.message}>
                <h1>404</h1>
                <p>
                    Нажаль ми не змогли знайти запитувану сторінку. 
                    Будь-ласка перевірте правильність посилання. 
                    За бажанням ви можете повернутися на головну сторінку сайту
                </p>
            </div>
            <div className={s.btnMainContainer}>
                <Link to="/#anchorAboutUs">Повернутися на головну</Link>
            </div>
        </div>
    )
}

export default NotFound;