import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function NewPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function getRegister(values) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      if (data?.token) {
        setLoading(false);
        setMsg("");
        navigate("/");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email not valid"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password not valid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: getRegister,
  });

  return (
    <div>
      <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
        {msg && <p className="alert alert-danger">{msg}</p>}
        <h4 className="my-3">Change Password:</h4>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onBlur={formik.handleBlur}
          className="form-control mb-3"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        {formik.errors.email && formik.touched.email && (
          <p className="alert alert-danger">{formik.errors.email}</p>
        )}

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          onBlur={formik.handleBlur}
          className="form-control mb-3"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />

        {formik.errors.newPassword && formik.touched.newPassword && (
          <p className="alert alert-danger">{formik.errors.newPassword}</p>
        )}

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
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
}
