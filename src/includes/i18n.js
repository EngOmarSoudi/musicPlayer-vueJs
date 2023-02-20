import { createI18n } from "vue-i18n";
import en from "@/locals/en.json";
import sp from "@/locals/sp.json";
import ar from "@/locals/ar.json";
import fr from "@/locals/fr.json";
export default createI18n({
  locale: "ar",
  fallbackLocale: "en",
  messages: {
    en,
    sp,
    ar,
    fr,
  },
});
