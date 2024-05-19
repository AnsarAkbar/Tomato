import React, { useState } from "react";
import { assets } from "../../assets/assets";
import {
  OutlinedInput,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
    <div className="max-w-md flex-col flex px-11 py-11 gap-5 rounded-md border-[2px] absolute bg-white right-1/3 top-1/4">
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
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          className="w-full"
          required
        />
      )}
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className="w-full"
        required
      />
      <FormControl className="w-full" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          required
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
        />
      </FormControl>
      <Button
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
            border:"none"
          },
        }}
      >
        {currentState === "login" ? "Login" : "Create account"}
      </Button>
      <div className="flex gap-2 items-baseline">
        <input type="checkbox" required />
        <p>By continuing, I agree to the terms of use & privacy policy</p>
      </div>
      <div>
        {currentState === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-blue-700 cursor-pointer"
            >
              Click here
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("login")}
              className="text-blue-700 cursor-pointer"
            >
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPop;
