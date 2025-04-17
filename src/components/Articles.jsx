import React from 'react';

const RecentArticles = () => {
  const articles = [
    {
      title: "Exploring Hidden Gems in Coastal Towns",
      date: "April 15, 2025",
      description: "Discover charming villages, local cuisine, and breathtaking views...",
      category: "Travel",
      imageUrl: "https://plus.unsplash.com/premium_photo-1682629632657-4ac307921295?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "The Future of AI in Everyday Applications",
      date: "April 10, 2025",
      description: "From smart homes to personalized recommendations, AI is transforming our lives...",
      category: "Technology",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Traditional Recipes with Modern Twists",
      date: "April 5, 2025",
      description: "Chefs around the world are reimagining classic dishes with innovative ingredients...",
      category: "Food",
      imageUrl: "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="container py-5">
      <h5 className="mt-5 mb-3"><strong>Recent Articles</strong></h5>
      <div className="row g-3">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4">
            <div className="card p-3 shadow-sm">
              <span className={`badge mb-1 ${article.category === 'Food' ? 'bg-warning text-dark' : article.category === 'Travel' ? 'bg-success' : 'bg-primary'}`}>
                {article.category}
              </span>
              <img src={article.imageUrl} className="card-img-top mb-2" alt={article.title} />
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
  );
};

export default RecentArticles;
