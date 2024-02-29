import React, { useContext, useState } from "react";
import { userContext } from "../../UserContext";
import {
  checkout,
  clearCart,
  deleteCart,
  getCart,
  updateCart,
  useCrudCart,
  useGetCart,
} from "../../useCart";
import Loading from "../../Loading";
import emptyimg from "../../assets/preview.png";

export default function Cart() {
  let { setIsOpen, isOpen } = useContext(userContext);
  let { data, isError, error, isLoading } = useGetCart("getCart", getCart);
  let { data: clearData, mutate: clearmutate } = useCrudCart(clearCart);
  let { mutate, data: deletedData } = useCrudCart(deleteCart);
  let { mutate: mutateupdate, data: updatedate } = useCrudCart(updateCart);
  let { mutate: mutatecheckout, data: checkoutdata } = useCrudCart(checkout);

  let [details, setDetails] = useState("");
  let [phone, setphone] = useState("");
  let [city, setcity] = useState("");

  function getAddress(e) {
    e.preventDefault();
    let id = data?.data?.data?._id;
    let shippingAddress = {
      details,
      phone,
      city,
    };

    mutatecheckout({ id, shippingAddress });
    if (checkoutdata?.data?.status === "success")
      window.location.href = checkoutdata?.data?.session?.url;
  }

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return (
      <div className="text-center my-4">
        <h4>Wish list is empty</h4>
        <img src={emptyimg} height={400} alt="" />
      </div>
    );

  return (
    <aside
      className={data?.data?.numOfCartItems ? "main-color" : "#fff"}
      style={
        isOpen
          ? { right: 0, transition: "right .7s" }
          : { right: "-100%", transition: "right .7s" }
      }
    >
      <i
        className="fa-solid fa-close p-3 fa-2x cursor-pointer"
        onClick={() => setIsOpen(false)}
      ></i>
      <div className="container">
        {data?.data?.numOfCartItems ? (
          <>
            <h3>Wish List:</h3>

            {
              data?.data?.data?.products?.map((ele) => (
                <div className="row align-items-center" key={ele.product._id}>
                  <div className="col-md-9">
                    <div className="row align-items-center">
                      <div className="col-md-2 my-2">
                        <img
                          src={ele.product.imageCover}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="col-md-10">
                        <p>{ele.product.title}</p>
                        <p className="text-main">{ele.price}: EGP</p>
                        <button
                          className="btn brd-btn  my-3"
                          onClick={() => mutate(data?._id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <div></div>
                  </div>
                </div>
              ))

              // modal
            }

            <button
              className="btn bg-main text-white me-auto my-3 d-block"
              onClick={() => clearmutate()}
            >
              clear wish list
            </button>

            <div
              className="modal fade"
              id="modalId"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="" onSubmit={getAddress}>
                      <input
                        type="text"
                        placeholder="details"
                        onChange={(e) => setDetails(e.target.value)}
                        className="form-control my-2"
                      />
                      <input
                        type="text"
                        placeholder="phone"
                        onChange={(e) => setphone(e.target.value)}
                        className="form-control my-2"
                      />
                      <input
                        type="text"
                        placeholder="city"
                        className="form-control my-2"
                        onChange={(e) => setcity(e.target.value)}
                      />
                      <button className="btn brd-btn" type="submit">
                        send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center my-4">
            <h4>Wish list is empty</h4>
            <img src={emptyimg} height={400} alt="" />
          </div>
        )}
      </div>
    </aside>
  );
}
