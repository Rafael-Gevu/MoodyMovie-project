import { createGlobalStyle } from 'styled-components'
import { AppRoutes } from "./pages/routes"
import { LanguageProvider } from './contexts/language-context'






function App() {
  return (
    <>
      <GlobalStyle />
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </>
  )
}
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style:none;
    *:visited{
    color: inherit;
    }
  }
  body {
    background: linear-gradient(135deg, black 30%, #800000);
  }
`
export default App