import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, error } = useQuery("categories", getCategories, {
    select: (data) => data?.data?.data,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      <div className="row">
        {data?.map((category) => (
          <div className="col-md-3" key={category._id}>
            <div className="item text-center">
              <img
                src={category.image}
                alt=""
                className="w-100 my-4"
                height={400}
              />
              <h3>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
