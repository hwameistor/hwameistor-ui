import DaoStyle from '@dao-style/core';

export async function loadExternalLanguage(lang: string) {
  const { default: daoStyleExtend } = await import(
    `@dao-style/extend/dist/locales/${lang}.js`
  );

  const daoStyleCore = DaoStyle.locale(lang) ?? {};

  return [daoStyleExtend, daoStyleCore];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setI18nLanguageExternal(lang: string) {
  // Do Something
}
