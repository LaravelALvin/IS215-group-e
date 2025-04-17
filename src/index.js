import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ImageUpload from './components/ImageUpload';
import ImageToArticle from './components/ImageToArticle';
import RecentArticles from './components/Articles';
import Header from './components/header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <ImageToArticle/>
    <ImageUpload/>
    <RecentArticles/>
  </React.StrictMode>
);

