import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'

import App from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Forgot from './pages/Forgot.tsx';
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frgt-pwd/:mail" element={<Forgot/>} />
        <Route path="/*" element={<h1>
                                      404<br /> 
                                      Not Found
                                  </h1>} />
      </Routes>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
