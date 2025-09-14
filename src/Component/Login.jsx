import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../assets/login-img.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // Call API
        const res = await axios.post(
          "https://localhost:7267/api/Auth/Login",
          values
        );

        // Save token & user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);

        // Update login state
        login();

        // Redirect to home
        navigate("/home");
      } catch (err) {
        if (err.response?.status === 401) {
          setErrors({ password: "Invalid username or password" });
        } else {
          setErrors({ password: "Server error, please try again later" });
        }
      } finally {
        setSubmitting(false);
      }
    },
    validateOnChange: true,
  });

  return (
    <div className="login-container">
      {/* Left side: image */}
      <div className="login-side-img">
        <img src={loginImg} alt="Login" />
      </div>

      {/* Right side: login box */}
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Enter your username"
              required
            />
            {formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              required
            />
            {formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
