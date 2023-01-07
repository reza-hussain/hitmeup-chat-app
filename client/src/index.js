import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';
import {initialState} from './context/initialState'
import './App.css';
import { ContextProvider } from "./context/ContextProvider";
import reducer from "./context/reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>
);
