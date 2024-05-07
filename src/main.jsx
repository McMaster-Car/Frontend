import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProviderWrapper, useThemeContext } from './Theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ThemeProviderWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProviderWrapper>
  </React.StrictMode>,
)
