import i18n from 'i18next';

export const tt = (str) => {
  return `${str}_${i18n.language}`;
};
