import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import path from 'path';

// Initialize i18next with filesystem backend
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector) // Automatically detect language
  .init({
    fallbackLng: 'en', // Fallback language
    lng: 'en', // Default language
    backend: {
      // Adjust the path to the locales folder, assuming it's in 'backend/locales'
      loadPath: path.resolve('./locales/{{lng}}/{{ns}}.json'), 
    },
    preload: ['en', 'hi'], // Preload all languages
    ns: ['translation'], // Namespaces to load
    defaultNS: 'translation', // Default namespace used if not specified
  });

export default i18next;