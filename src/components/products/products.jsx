import React from "react";
import FeaturedProducts from "../../components/homescreen/ProductList";
import FashionCategories from "../../components//homescreen/Categories";
import Features from "../../components//homescreen/Features";

const Products = () => {
  return (
    <div className="pt-24">
      <FeaturedProducts />
      <FashionCategories />
      <Features />
    </div>
  );
};

export default Products;
