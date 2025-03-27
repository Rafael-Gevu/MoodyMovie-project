import { createContext, useState } from "react";


export const languages = {
    english: 'en-US',
    portuguese: 'pt-BR'
}


export const LanguageContext = createContext({})

export const LanguageProvider = (props) => {
    const [language, setLanguage] = useState(languages.english)
    return(
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}