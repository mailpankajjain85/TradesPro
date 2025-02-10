import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded users and passwords
    const users = ["Tanish123", "Pankaj123", "Piyush123", "Samyak123"];
    if (users.includes(username) && password === username) {
      setLoggedInUser(username); // Set the logged-in user
      navigate("/"); // Redirect to the home page
    } else {
      setError("Invalid username or password");
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