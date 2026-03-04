import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
const root = document.getElementById('emp-root');
createRoot(root).render(React.createElement(App));
