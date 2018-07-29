import React from 'react';
import ContentLoader from 'react-content-loader';

export default function UserListItemLoader() {
  return (
    <ContentLoader height={50} width={500} speed={0.5}>
      <rect x="46" y="28.05" rx="4" ry="4" width="100" height="5" />
      <rect x="46" y="16.05" rx="4" ry="4" width="200" height="5" />
      <circle cx="25.23690632574555" cy="25.25690632574555" r="15.20690632574555" />
    </ContentLoader>
  );
}
