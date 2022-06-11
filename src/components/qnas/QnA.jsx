import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src="" alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {}
            </Link>
            <div className="price mb-2"></div>
            <div className="row">
              <Link
                to={`/product/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
