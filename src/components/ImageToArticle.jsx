import React, { useState, useRef } from 'react';
import '../css/ImageToArticle.css';

const ImageToArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null); // Ref for file input

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isJsonFile =
      file.type === "application/json" ||
      file.name.toLowerCase().endsWith(".json");

    if (isJsonFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target.result);
          setJsonData(parsedJson);
          setFileName(file.name);
        } catch (error) {
          console.error("Invalid JSON file:", error);
          alert("The uploaded file is not a valid JSON.");
          fileInputRef.current.value = ""; // Clear input
          setFileName("");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
      fileInputRef.current.value = ""; // Clear input
      setFileName("");
    }
  };

  const handleGenerateArticle = async () => {
    if (!jsonData) {
      setErrorMessage("Please upload a JSON file first.");
      return;
    }
    if (!apiKey) {
      setErrorMessage("Please enter your API key.");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    try {
      const message = `Write a short article based on the following image labels:\n\n${JSON.stringify(jsonData, null, 2)}`;

      const res = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        setErrorMessage("Invalid API key or error generating article.");
        return;
      }

      const newArticle = {
        title: data.title || "Article Title Here",
        description: data.content || "Something poetic was meant to be here.",
        category: "Sports",
        date: new Date().toLocaleDateString(),
        imageUrl: "./images/basketball.png",
      };

      setArticles((prev) => [newArticle, ...prev]);
    } catch (err) {
      console.error('Error generating article:', err);
      setErrorMessage("An error occurred while generating the article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column align-items-center mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <img
          src="./images/basketball.png"
          alt="Basketball"
          className="mb-3"
          style={{ width: '500px', height: 'auto' }}
        />
        <a
          href="/data.json"
          download="data.json"
          className="btn btn-outline-secondary mb-3"
        >
          Download JSON
        </a>

        <p className="text-muted mb-2">
          Click the "Download JSON" button above to download the JSON file, then attach the file below.
        </p>
        <p className="text-muted mb-2">
          You may also attach a different JSON file that contains bounding box data.
        </p>

        <input
          type="file"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="form-control mb-2"
        />
        {fileName && <p className="text-muted">Loaded: {fileName}</p>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your API key from the Grades page of IS 215 in MyPortal"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleGenerateArticle}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Article'}
        </button>

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="row g-3">
        <div className={`articles-wrapper ${loading ? 'shifted' : ''}`}>
          {loading && (
            <div className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <div className="skeleton skeleton-card-img mb-2" />
                <div className="skeleton skeleton-title mb-2" />
                <div className="skeleton skeleton-text mb-1" />
                <div className="skeleton skeleton-text mb-2" />
                <div className="skeleton skeleton-link" />
              </div>
            </div>
          )}

          {articles.map((article, index) => (
            <div key={index} className="col-md-3">
              <div className="card p-3 shadow-sm h-100">
                <span className={`badge mb-2 ${article.category === 'Food' ? 'bg-warning text-dark' : article.category === 'Travel' ? 'bg-success' : 'bg-primary'}`}>
                  {article.category}
                </span>
                <img src={article.imageUrl} className="card-img-top mb-2 rounded" alt={article.title} />
                <h6>{article.title}</h6>
                <p className="text-muted small">{article.date}</p>
                <p className="small">{article.description}</p>
                <a href="#" className="text-primary small">
                  Read more <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageToArticle;
