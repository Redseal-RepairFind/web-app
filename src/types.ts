import translations from "./i8n.json";

export type LanguageKey = keyof typeof translations.select_language;

export type wordKey = keyof typeof translations;

export type ContextType = {
  languageChoice: string;
};
