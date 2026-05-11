import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ja: () => import("../dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale === "en" || locale === "ja") {
    return dictionaries[locale]();
  }
  return dictionaries.ja();
};
