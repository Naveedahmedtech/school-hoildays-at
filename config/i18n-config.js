const i18next  = require("i18next");
const I18NexFsBackend  = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(I18NexFsBackend) // Connects the file system backend
  .use(middleware.LanguageDetector) // Enables automatic language detection
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        "../../locales",
        "{{lng}}",
        "{{ns}}.json"
      ),
    },
    detection: {
      order: ["querystring", "cookie"], // Priority: URL query string first, then cookies
      caches: ["cookie"], // Cache detected language in cookies
    },
    fallbackLng: "en", // Default language when no language is detected
    preload: ["en", "fr"], // Preload these languages at startup
  });

module.exports = { i18next };
