import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;

Meta.defaultProps = {
  title: 'Welcome To Dipti Emanuel Cakes || Home',
  keywords:
    'cake,furit cake,chocolate cake,cake shop,cake shop near me,vanilla cake,chocolate',
  description:
    'This is the official website of dipti emanuel cakes shop.we serve you the tastiest and fresh cakes with beautiful designs at lowest price.',
};
