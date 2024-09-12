import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize i18next with filesystem backend
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector) // Automatically detect language
  .init({
    fallbackLng: 'en', // Fallback language
    lng: 'en', // Default language
    backend: {
      // Adjust the path to the locales folder
      loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
    },
    preload: ['en', 'hi'], // Preload all languages
    ns: ['translation'], // Namespaces to load
    defaultNS: 'translation', // Default namespace used if not specified
  });

export default i18next;