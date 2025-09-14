import React from "react";
import { Link } from "react-router-dom";  
import "./Signup.css";
import bgImage from "../assets/background.jpeg"; 
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      gender: Yup.string().required("Please select your gender"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert("Signup successful!");
    },
    validateOnChange: true,
  });

  return (
    <div
      className="signup-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <div className="error">{formik.errors.name}</div>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && <div className="error">{formik.errors.username}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && <div className="error">{formik.errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <div className="error">{formik.errors.password}</div>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && <div className="error">{formik.errors.phone}</div>}

          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.errors.gender && <div className="error">{formik.errors.gender}</div>}

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link> 
        </p>
      </div>
    </div>
  );
}

export default Signup;
