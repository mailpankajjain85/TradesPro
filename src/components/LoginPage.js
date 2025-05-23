import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from "../api"; // Import the configured axios instance

const LoginPage = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const orgShortCode = "org01"; // Hardcoded for now

      const response = await api.post("/auth/login", {
        userId: username,
        password,
        orgShortCode,
      });

      const { token } = response.data;

      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Decode the token to extract user details
      const decodedToken = jwtDecode(token);
      const { username: decodedUsername, role } = decodedToken;

      // Set the logged-in user with details from the token
      setLoggedInUser({ username: decodedUsername, role });

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      setError("Invalid username, password, or organization");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper style={{ padding: 16, width: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;