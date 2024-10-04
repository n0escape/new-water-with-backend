import { Link } from 'react-router-dom';
import s from './NotFound.module.css'
import fonts from '../../../generalStyles/Fonts.module.css'

const NotFound = ({errorPage}) => {
    return (
        <div className={s.notFound}>
            <div className={s.message}>
                <h1 className={fonts.notFoundDisplay}>404</h1>
                <p className={fonts.textMRegular}>
                    {errorPage.details}
                </p>
            </div>
            <div className={s.btnMainContainer}>
                <Link className={fonts.labelS}to="/#anchorAboutUs">Повернутися на головну</Link>
            </div>
        </div>
    )
}

export default NotFound;