import React, { useState } from 'react';

const header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#"><i className="fas fa-camera"></i> PicTell</a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Articles</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default header;
