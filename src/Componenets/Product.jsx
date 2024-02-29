import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCrudCart } from "../useCart";

export default function Product({ prod }) {
  let [heart, setHeart] = useState(false);
  let { mutate, isError, error } = useCrudCart(addToCart);

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="col-md-3">
      <div className="product p-3 cursor-pointer">
        <i
          className="fa-solid fa-heart fa-1x m-3 cursor-pointer"
          style={heart ? { color: "green" } : { color: "unset" }}
          onClick={() => setHeart(!heart)}
        ></i>
        <Link to={`/productdetails/${prod._id}`}>
          <img src={prod.imageCover} className="w-100" alt={prod.title} />
          <h2 className="h6 text-main">{prod.category.name}</h2>
          <p>{prod.title}</p>
          <div className="d-flex justify-content-between">
            <span>{prod.price} EGB</span>
            <span>
              {prod.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
        </Link>
        <button
          className="btn brd-btn bg-main text-white form-control my-2"
          onClick={() => mutate(prod._id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
