const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'fr'], 
  directory: __dirname + '/locales', 
  defaultLocale: 'fr',
  cookie: 'locale', 
});

module.exports = i18n;
