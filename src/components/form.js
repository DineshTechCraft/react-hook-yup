import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  phone: yup
    .string().min(10).max(10)
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter a valid phone number"
    )
    .required(),
  password: yup.string().min(8).max(15).required(),
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
    resolver:yupResolver(schema),
  });

  const onsubmitHandle = (data) => {
    console.log({ data });
    reset();
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onsubmitHandle)}>
        <h2>Register Here</h2>
        <div className="mt-3">
          <label>Name:</label>
          <input {...register("name")} placeholder="Enter Your Name" required />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label>Phone:</label>
          <input {...register("phone")} placeholder="Enter Your Phone" required />
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <label>Email:</label>
          <input
            {...register("email")}
            placeholder="Enter Your Email"
            type="email"
            required
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>Password:</label>
          <input
            {...register("password")}
            placeholder="Enter Your Password"
            type="password"
            required
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            {...register("confirm_password")}
            placeholder="Confirm Your Password"
            type="password"
            required
          />
          <p>{errors.confirm_password?.message}</p>

        </div> 

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Form;
