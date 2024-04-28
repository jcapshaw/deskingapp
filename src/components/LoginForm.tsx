import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
} from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Correctly use the imported signInWithEmailAndPassword function
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("Login Success:", userCredential);
      navigate("/input"); // Redirect to the 'input' page on successful login
    } catch (error) {
      // Handle errors here
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
        setLoginError(error.message); // Display the error message
      } else {
        console.error("Login Error:", error);
        setLoginError("An error occurred during login.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://hh.dealeracumen.com/wp-content/uploads/2024/03/Login-Speedometer.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: 400, // or any specific width you prefer
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Optional: Adds a slight white overlay for better readability
          padding: "20px",
          borderRadius: "4px", // Optional: Adds rounded corners
        }}
      >
        <LockIcon sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {loginError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
