import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      return column;
    };

    const createPattern = () => {
      const pattern = document.createElement('div');
      pattern.className = 'matrix-pattern';
      for (let i = 0; i < 40; i++) {
        pattern.appendChild(createColumn());
      }
      return pattern;
    };

    const addPatterns = () => {
      for (let i = 0; i < 5; i++) {
        container.appendChild(createPattern());
      }
    };

    addPatterns();

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div className="matrix-container" ref={containerRef} />;
};

export default MatrixBackground;