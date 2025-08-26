import React from 'react';

const MacCodePreviewCard = ({ code }) => {
    return (
        <div className="mac-code-preview-card">
            <div className="mac-header">
                <h2>Code Preview</h2>
            </div>
            <div className="code-content">
                <pre>{code}</pre>
            </div>
        </div>
    );
};

export default MacCodePreviewCard;