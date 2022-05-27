import React from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SaleStatistics";
import ProductsStatistics from "./ProductsStatistics";

const Main = () => {
  const products = [];
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <TopTotal products={products} />
        <div className="row">
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        <div className="card mb-4 shadow-sm"></div>
      </section>
    </>
  );
};

export default Main;
