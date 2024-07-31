import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import HttpClient from './network/http.js';
import AuthService from './service/auth.js';
import PostService from './service/post.js';
import { AuthProvider } from './context/AuthProvider.jsx';
import TokenStorage from './db/token.js';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient, tokenStorage);
const postService = new PostService(httpClient, tokenStorage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider authService={authService}>
      <App postService={postService} />
    </AuthProvider>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
