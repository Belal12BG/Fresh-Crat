import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../UserContext";

export default function Login() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");
  let { setUser, setLogin } = useContext(userContext);

  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        setUser(data.token);
        setLogin(data.user.name);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user.name);
        setLoading(false);
        setMsg("");
        navigate("/home");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: getLogin,
  });

  return (
    <div>
      <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}
        <h3 className="my-3 pb-4 pt-3">Welcome back!</h3>
        <h4 className="my-3 pt-2">Login Now:</h4>

        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          onBlur={formik.handleBlur}
          className="form-control mb-3"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          onBlur={formik.handleBlur}
          className="form-control mb-3"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}
        <a
          href="#"
          className="text-decoration-none text-success d-block"
          onClick={() => navigate("/ForgetPassword")}
        >
          <u>Forgot Password?</u>
        </a>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-main text-white ms-auto d-block mb-4"
          type="submit"
        >
          {loading ? (
            <Bars
              height="20"
              width="40"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            ></Bars>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
