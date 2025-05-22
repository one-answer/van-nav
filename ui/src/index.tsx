import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from './reportWebVitals';

console.log("欢迎使用 狗窝导航 项目")

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.register(null);