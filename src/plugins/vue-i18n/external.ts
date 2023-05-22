import DaoStyle from '@dao-style/core';
import { setFetchAcceptLanguage } from '../fetch/request';

export async function loadExternalLanguage(lang: string) {
  const { default: daoStyleExtend } = await import(
    `@dao-style/extend/dist/locales/${lang}.js`
  );

  const daoStyleCore = DaoStyle.locale(lang) ?? {};

  return [daoStyleExtend, daoStyleCore];
}

export function setI18nLanguageExternal(lang: string) {
  setFetchAcceptLanguage(lang);
}
