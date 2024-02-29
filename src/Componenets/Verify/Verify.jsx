import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset Code is required")
      .min(4, "Reset Code must be at least 4 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        if (data?.status === "Success") {
          setLoading(false);
          setMsg("");
          navigate("/NewPassword");
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
        <h4 className="my-3">Enter Reset Code:</h4>

        <div className="mb-3">
          <label htmlFor="resetCode">Reset Code:</label>
          <input
            type="text"
            id="resetCode"
            onBlur={formik.handleBlur}
            className="form-control mb-3"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
          />

          {formik.errors.resetCode && formik.touched.resetCode && (
            <p className="alert alert-danger">{formik.errors.resetCode}</p>
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
