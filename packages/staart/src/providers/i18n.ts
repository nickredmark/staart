import * as PropTypes from 'prop-types';
import { withContext } from 'recompose';

type Translations = {
  [lang: string]: {
    [key: string]: string | TranslationGroup;
  };
};

type TranslationGroup = {
  [key: string]: string | TranslationGroup;
};

/* tslint:disable-next-line function-name */
function __(translations: Translations, language: string, key: string): string {
  const parts = key.split('.');
  let current: string | TranslationGroup = translations[language];
  for (const part of parts) {
    if ((current as TranslationGroup)[part] === undefined) {
      throw Error(`Unknown translation ${language}.${key}.`);
    }
    current = (current as TranslationGroup)[part];
  }
  return current as string;
}

export default (translations: Translations, language = 'en') => {
  let currentLanguage = language;

  return withContext(
    {
      translations: PropTypes.object,
      __: PropTypes.func,
      setLanguage: PropTypes.func,
    },
    () => ({
      translations,
      __: (key: string) => __(translations, currentLanguage, key),
      setLanguage: (lang: string) => (currentLanguage = lang),
    }),
  );
};
