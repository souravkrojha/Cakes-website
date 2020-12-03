import React from 'react';
import { Link } from 'react-router-dom';
const Category = ({ categoryItem }) => {
  return (
    <div className="category-items">
      <Link to={`/categories/${categoryItem.name}`}>
        <img src={categoryItem.image} alt={categoryItem.name} />
        <h5 className="category-items-name my-3">{categoryItem.name}</h5>
      </Link>
    </div>
  );
};

export default Category;
