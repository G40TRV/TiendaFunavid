import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./features/auth/login.css";
import { App } from './app.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

