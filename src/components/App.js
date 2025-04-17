// client/src/App.js
import React from 'react';
import ImageUpload from './ImageUpload';
import RecentArticles from './Articles';
import ImageToArticle from './ImageToArticle';

const App = () => {
  return (
    <div>
      <ImageUpload/>
      <ImageToArticle/>
      <RecentArticles/>
    </div>
  );
};

export default App;
