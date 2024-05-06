import s from '../components/general/ScrollToTop/ScrollToTop.module.css';

const calcPageUpBtnPos = () => {
    let footer = document.querySelector('footer');
    if (!footer) return;

    let bottomLeft = document.getElementsByClassName(s.pageUp)[0];
    let footerOffset = footer.getBoundingClientRect().top - window.innerHeight;

    if (footerOffset <= 0) {
        bottomLeft.style.bottom = Math.abs(footerOffset) + 'px';
    } else {
        bottomLeft.style.bottom = '10px';
    }
};

const scrollTrick = (calcPosCallback) => {
    window.addEventListener('scroll', () => calcPosCallback());
};

const domObserver = (calcPosCallback) => {
    let observer = new MutationObserver(calcPosCallback)
    const config = {
        attributes: true,
        childList: true,
        subtree: true,
    };
    observer.observe(document, config)
}

const initializePage = () => {    
    calcPageUpBtnPos(); // Проверка положения footer при загрузке страницы
    domObserver(calcPageUpBtnPos) // Проверка положения footer при изменении DOM
    scrollTrick(calcPageUpBtnPos); // Добавление обработчика scroll
};

export default initializePage;