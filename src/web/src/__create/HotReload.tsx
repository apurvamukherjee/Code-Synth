import React, { useEffect } from 'react';

const HotReload = () => {
  useEffect(() => {
    if (module.hot) {
      module.hot.accept();
    }
  }, []);

  return null;
};

export default HotReload;