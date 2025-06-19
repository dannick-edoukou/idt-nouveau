'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CoverageMap = dynamic(() => import('./CoverageMap'), {
  ssr: false,
});

const CoverageMapWrapper = () => {
  return (
    <div>
      <CoverageMap />
    </div>
  );
};

export default CoverageMapWrapper;