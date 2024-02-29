import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, refetch } = useQuery("brands", getBrands, {
    select: (data) => data?.data?.data,
    enabled: true,
  });

  return (
    <div className="container">
      <div className="row">
        {data?.map((ele) => (
          <div className="col-md-3" key={ele._id}>
            <div className="item text-center">
              <img src={ele.image} alt="" />
              <h3>{ele.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
