import { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("vi");

    function toggleLang() {
        setLang((l) => (l === "vi" ? "en" : "vi"));
    }

    return (
        <LanguageContext.Provider
            value={{ lang, toggleLang, t: translations[lang] }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
