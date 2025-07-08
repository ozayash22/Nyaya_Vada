// src/pages/Login.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password);
      navigate("/"); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: 2,
      }}
    >
      {/* Blue top bar */}
      <Box
        sx={{
          position: "fixed", // fixed navbar
          top: 0,
          left: 0,
          right: 0,
          width: "98vw", // full viewport width
          height: "80px",
          backgroundColor: "#0a2463",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          flexWrap: "wrap",
          overflowX: "hidden", // prevent overflow
        }}
      >
        {/* Logo and platform name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "15px 0px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              flexShrink: 0,
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              className="svg-inline--fa fa-scale-balanced"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              style={{ width: "26px", height: "26px", color: "#d4af37" }}
            >
              <path
                fill="currentColor"
                d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"
              />
            </svg>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              fontSize: "1.4rem",
            }}
          >
            <span style={{ color: "#d4af37" }}>Nyaya</span> Vaad
          </Typography>
        </Box>

        {/* Navigation links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              "&:hover": {
                color: "#d4af37",
              },
              transition: "color 0.2s ease",
              padding: "5px 10px",
            }}
          >
            Home
          </Link>

          <Link
            component={RouterLink}
            to="/contact"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              "&:hover": {
                color: "#d4af37",
              },
              transition: "color 0.2s ease",
              padding: "5px 10px",
            }}
          >
            Contact
          </Link>

          <Link
            component={RouterLink}
            to="/register"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              "&:hover": {
                color: "#d4af37",
              },
              transition: "color 0.2s ease",
              padding: "5px 10px",
            }}
          >
            Sign Up
          </Link>

          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: "#d4af37",
              color: "white",
              fontWeight: "bold",
              padding: "0px 0x 0px 30px",
              borderRadius: "6px",
              textTransform: "none",
              fontSize: "0.95rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#c4a030",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              },
              transition: "all 0.2s ease",
              minWidth: "80px",
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo and title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                borderRadius: "50%",
                padding: 3,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                boxShadow: 3,
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="svg-inline--fa fa-scale-balanced"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                style={{ width: "1.5rem", height: "1.5rem", color: "#d4af37" }}
              >
                <path
                  fill="currentColor"
                  d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"
                />
              </svg>
            </Box>
          </Box>
          <Typography
            variant="h4"
            sx={{ mt: 2, fontWeight: 700, color: "white" }}
          >
            <span style={{ color: "#0a2463" }}>Legal</span>
            <span style={{ color: "#d4af37" }}>AI</span>
          </Typography>
        </Box>

        {/* Form container */}
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            color: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            border: "1px solid",
            borderColor: "grey.700",
          }}
        >
          {/* Divider with text */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Box
              sx={{ flexGrow: 1, height: "1px", backgroundColor: "grey.700" }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ px: 2, color: "grey.300" }}
            >
              Login
            </Typography>
            <Box
              sx={{ flexGrow: 1, height: "1px", backgroundColor: "grey.700" }}
            />
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                component="label"
                htmlFor="email"
                sx={{ display: "block", mb: 1, color: "grey.300" }}
              >
                Email Address
              </Typography>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    borderRadius: "8px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#d4af37",
                      boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.2)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "grey.500" }}>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-envelope"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{ width: "1rem", height: "1rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Password field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                component="label"
                htmlFor="password"
                sx={{ display: "block", mb: 1, color: "grey.300" }}
              >
                Password
              </Typography>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    borderRadius: "8px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#d4af37",
                      boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.2)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "grey.500" }}>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-lock"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        style={{ width: "1rem", height: "1rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{
                          color: "grey.500",
                          "&:hover": { color: "grey.300" },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Error message */}
            {error && (
              <Typography
                sx={{
                  mb: 2,
                  padding: "8px 12px",
                  backgroundColor: "#2a0000",
                  color: "#ff6b6b",
                  borderRadius: "6px",
                  borderLeft: "3px solid",
                  borderColor: "#ff6b6b",
                }}
              >
                {error}
              </Typography>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: "#d4af37",
                color: "white",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#c4a030",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Register link */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 3, color: "grey.300" }}
          >
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: "#d4af37",
                fontWeight: "bold",
                textDecoration: "underline",
                "&:hover": {
                  color: "#c4a030",
                },
              }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
