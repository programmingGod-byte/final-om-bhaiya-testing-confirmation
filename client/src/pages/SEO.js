import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url }) => {
  return (
    <Helmet>
      <title>{title} | VeriGeek</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
