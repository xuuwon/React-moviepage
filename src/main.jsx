import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter.jsx'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <MainRouter />
  </BrowserRouter>,
)
