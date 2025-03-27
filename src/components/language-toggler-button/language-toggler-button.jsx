import React, { useContext } from "react"
import { LanguageContext, languages } from "../../contexts/language-context"
import { Input } from "../button/button"






export const LanguageTogglerButton = () =>{
    const {language, setLanguage}  = useContext(LanguageContext)
    
    return (
        <div>
            <Input              
             type="checkbox"
             onClick={() => {setLanguage(language === languages.english ? languages.portuguese : languages.english)}}
             />
        </div>
    )
}


