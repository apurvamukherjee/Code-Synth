import React from 'react';

const MacCodePreviewCard = ({ title, description, code, tags }) => {
  return (
    <div className="card">
      <div className="mac-header">
        <span className="red"></span>
        <span className="yellow"></span>
        <span className="green"></span>
      </div>
      <span className="card-title">{title}</span>
      <p className="card-description">{description}</p>
      {tags && tags.map((tag, index) => (
        <span key={index} className="card-tag">{`TAG ${tag}`}</span>
      ))}
      <div className="code-editor">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};

export default MacCodePreviewCard;