import s from './LoaderPage.module.css'

const LoaderPage = () => {
    return (
        <div className={s.loaderPage}>
            <div><h1>New Water</h1></div>
            <div className={s.loaderGif}>
                <img src={process.env.PUBLIC_URL + '/assets/general/loading.gif'} alt='loading gif' />
            </div>
            {/* <div className={s.loaderItem}></div> */}
        </div>
    )
}

export default LoaderPage;