import React, { useState } from 'react';

const ImageUpload = () => {
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      // Simulate progress bar for image analysis
      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            clearInterval(progressInterval);
            // Generate article when the progress reaches 100%
            setGeneratedArticle({
              title: "Savoring Ethiopian Flavors: A Gastronomic Adventure",
              category: "Food & Cuisine",
              content: "There’s something magical about the way food connects us to culture, history, and each other...",
            });
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <div className="container py-5">
        <div className="card p-4 shadow-sm mb-4">
          <h5><strong>Upload an Image to Generate an Article</strong></h5>
          <p className="text-muted">Our AI will analyze your image and automatically create an article based on what it sees.</p>
          <div
            id="dropZone"
            className="border border-2 border-primary rounded p-5 text-center bg-light-subtle"
            style={{ cursor: 'pointer' }}
            onClick={handleBrowseClick}
          >
            <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
            <p className="text-primary">Drag & drop an image here or click to browse</p>
            <p className="text-muted small">Supports: JPG, PNG, GIF (Max 5MB)</p>
            <button id="browseBtn" className="btn btn-primary">Browse Files</button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="d-none"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {isAnalyzing && (
          <div id="progressContainer" className="card text-center p-4 shadow-sm">
            <p><strong>Analyzing Image...</strong></p>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="small mt-2">{progress}%</p>
          </div>
        )}

        {generatedArticle && !isAnalyzing && (
          <div id="articlePreview" className="card p-4 shadow-sm">
            <h6 className="mb-3">Generated Article Preview</h6>
            <div className="row">
              <div className="col-md-4">
                <img id="previewImage" src={image} className="img-fluid rounded img-preview" alt="Preview" />
              </div>
              <div className="col-md-8">
                <input type="text" className="form-control mb-2" value={generatedArticle.title} />
                <select className="form-select mb-2" value={generatedArticle.category}>
                  <option>Food & Cuisine</option>
                  <option>Travel</option>
                  <option>Technology</option>
                </select>
                <textarea className="form-control mb-2" rows="6" value={generatedArticle.content}></textarea>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary me-2">Regenerate</button>
                  <button className="btn btn-success">Publish Article</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
