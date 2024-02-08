import React from "react";

const ProductCountWidget = ({ count }) => {
  return (
    <div className="product-count-widget">
      <h1>Product Count</h1>
      <div className="count">{count}</div>
    </div>
  );
};

export default ProductCountWidget;
