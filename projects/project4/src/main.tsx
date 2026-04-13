import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './styles/GlobalStyles.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <GlobalStyles />
    <App />
  </BrowserRouter>,
)
