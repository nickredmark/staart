import provideI18n from 'staart/lib/providers/i18n'

const translations = {
    en: require('staart/i18n/en.json')
}

export default provideI18n(translations, 'en')