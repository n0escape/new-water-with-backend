import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import XHR from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

i18next
    .use(XHR)
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['uk', 'ru'],
        fallbackLng: 'uk',
        returnObjects: true,
        detection: {
            order: ['querystring','path','cookie','htmlTag','localStorage','sessionStorage','subdomain'],
            caches: ['cookie', 'localStorage'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupSessionStorage: 'i18nextLng'
        },
        backend: {
            loadPath: (lng, ns) => `/locales/${lng}/${ns}.json`
        },
        interpolation: {
            escapeValue: false,
        }
    });

export default i18next;