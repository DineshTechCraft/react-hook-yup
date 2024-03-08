import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  phone: yup
  .string()
  .required('Mobile number is required')
  .matches(
    /^[0-9]{10}$/,
    'Mobile number must be 10 digits and contain only numbers'
  ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmitHandle = async (data) => {
    console.log("Form Data:", data);
    try {
      await axios.post("http://localhost:5000/api/register", data);
      console.log("User registered successfully");
      reset();
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-success">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onsubmitHandle)}>
          <div className="mb-3">
            <input
              {...register("name")}
              className="form-control"
              placeholder="Enter Your Name"
              required
            />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="mb-3">
            <input
              {...register("phone")}
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
            <p className="text-danger">{errors.phone?.message}</p>
          </div>
          <div className="mb-3">
            <input
              {...register("email")}
              className="form-control"
              placeholder="Enter Your Email"
              type="email"
              required
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
          <div className="mb-3">
            <input
              {...register("password")}
              className="form-control"
              placeholder="Enter Your Password"
              type="password"
              required
            />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          <div className="mb-3">
            <input
              {...register("confirm_password")}
              className="form-control"
              placeholder="Confirm Your Password"
              type="password"
              required
            />
            <p className="text-danger">{errors.confirm_password?.message}</p>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
