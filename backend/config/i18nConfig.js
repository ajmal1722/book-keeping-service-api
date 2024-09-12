import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import path from 'path';

// Use the correct path to your locales directory
const localesPath = path.resolve('backend/locales/{{lng}}/{{ns}}.json');

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector) // Automatically detect language
  .init({
    fallbackLng: 'en', // Fallback language
    lng: 'en', // Default language
    backend: {
      loadPath: localesPath, // Correct path to locales
    },
    preload: ['en', 'hi'], // Preload all languages
    ns: ['translation'], // Namespaces to load
    defaultNS: 'translation', // Default namespace used if not specified
  });

export default i18next;