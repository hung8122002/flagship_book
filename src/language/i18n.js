import { createI18n } from "vue-i18n";
import enMess from "./en.json";
import vnMess from "./vn.json";
const messages = {
  en: enMess,
  vn: vnMess,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
