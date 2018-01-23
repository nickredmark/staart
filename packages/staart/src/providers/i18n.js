import PropTypes from 'prop-types'
import {withContext} from 'recompose'

function __(translations, language, key) {
    const parts = key.split('.')
    let current = translations[language]
    for (const part of parts) {
        if (current[part] === undefined) {
            throw Error(`Unknown translation ${language}.${key}.`)
        }
        current = current[part]
    }
    return current
}

export default (translations, language = 'en') => withContext({
    translations: PropTypes.object,
    __: PropTypes.func,
    setLanguage: PropTypes.func,
}, () => ({
    translations,
    __: (key) => __(translations, language, key),
    setLanguage: (lang) => language = lang,
}))
