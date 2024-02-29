import React from "react";
import { useParams } from "react-router-dom";
import { featuredSingleProduct, useProduct } from "../useProduct";
import { addToCart, useCrudCart } from "../useCart";
import Slider from "react-slick";
import Loading from "../Loading";

export default function ProductDetails() {
  let { id } = useParams();
  let { data } = useProduct("prod", () => featuredSingleProduct(id));
  let { mutate, isLoading, isError, error } = useCrudCart(addToCart);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-3 pt-4">
          <Slider {...settings}>
            {data?.images?.map((img) => (
              <img key={img} src={img} alt=""></img>
            ))}
          </Slider>
        </div>
        <div className="col-md-9">
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <div className="d-flex justify-content-between">
            <span>{data?.price} EGB</span>
            <span>
              {data?.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button
            className="btn brd-btn bg-main text-white form-control my-3"
            onClick={() => mutate(data?._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
