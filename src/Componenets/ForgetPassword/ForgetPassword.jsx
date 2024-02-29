import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        if (data?.statusMsg === "success") {
          setLoading(false);
          setMsg("");
          navigate("/Verify");
        }
      } catch (error) {
        setMsg(error.response.data.message);
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
        {msg && <p className="alert alert-danger">{msg}</p>}
        <h4 className="my-3">Enter Your Email:</h4>

        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="alert alert-danger">{formik.errors.email}</p>
          )}
        </div>

        <button
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-main text-white ms-auto d-block"
          type="submit"
        >
          {loading ? (
            <Bars
              height={20}
              width={40}
              color="#fff"
              ariaLabel="bars-loading"
              visible={true}
            />
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}
