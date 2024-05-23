import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  OutlinedInput,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().when("currentState", {
    is: "Sign Up",
    then: Yup.string().required("Full Name is required"),
  }),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const LoginPop = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-md px-6 py-8 rounded-md border-[2px] absolute bg-white right-1/3 top-1/4 z-10">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          currentState: currentState,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          // Handle form submission
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="gap-5 flex-col flex">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold font-outfit ">
                  {currentState === "login" ? "Login" : "Sign Up"}
                </p>
                <img
                  onClick={() => setShowLogin(false)}
                  src={assets.cross_icon}
                  alt="Close"
                  className="w-4 cursor-pointer h-4"
                />
              </div>
              {currentState === "Sign Up" && (
                <div>
                  <Field
                    as={TextField}
                    name="fullName"
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    className="w-full"
                    required
                    onChange={handleChange}
                    error={Boolean(ErrorMessage.name === "fullName")}
                    helperText={<ErrorMessage name="fullName" />}
                  />
                </div>
              )}
              <div>
                <Field
                  as={TextField}
                  name="email"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full"
                  required
                  onChange={handleChange}
                  error={Boolean(ErrorMessage.name === "email")}
                  helperText={<ErrorMessage name="email" />}
                />
              </div>
              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <Field
                  as={OutlinedInput}
                  name="password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={Boolean(ErrorMessage.name === "password")}
                />
                <FormHelperText>
                  <ErrorMessage name="password" />
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="outlined"
                className="w-full"
                sx={{
                  backgroundColor: "#EF6C00",
                  color: "white",
                  border: "none",
                  textTransform: "none",
                  fontSize: "1rem",
                  paddingY: 1.5,
                  "&:hover": {
                    backgroundColor: "#E65100",
                    border: "none",
                  },
                }}
              >
                {currentState === "login" ? "Login" : "Create account"}
              </Button>
            </div>
            <div className="flex gap-2 items-baseline pt-3 ">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            <div className="pt-4">
              {currentState === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-orange-600 cursor-pointer font-medium "
                  >
                    Click here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => 
                      setCurrentState("login")}
                      className="text-orange-600 cursor-pointer font-medium "
                    >
                      Login
                    </span>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  
  export default LoginPop;