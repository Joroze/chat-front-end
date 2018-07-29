import React from 'react';
import ContentLoader from 'react-content-loader';

export default function MessageLoader() {
  return (
    <ContentLoader height={50} width={500} speed={0.5}>
      <rect x="46" y="29.05" rx="4" ry="4" width="210" height="5" />
      <rect x="46" y="14.05" rx="4" ry="4" width="300" height="5" />
      <rect x="6.83" y="10.05" rx="0" ry="0" width="28" height="28" />
    </ContentLoader>
  );
}
