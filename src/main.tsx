import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { I18nextProvider } from 'react-i18next';
import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import i18n from './i18n'
import { Login } from './components/Login';
import { About } from './pages/about';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path= '/' element= {<About/>} />
          <Route path= 'register' element= {<Register/>} />
          <Route path= 'login' element= {<Login/>} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
)
