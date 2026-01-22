import React, { useRef, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import shield from "../../assets/img.jpeg";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    let newErrors = {};

    if (!firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "Enter a valid first name";
    }

    if (!lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "Enter a valid last name";
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) { 
       newErrors.email = "Enter a valid email address";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } 
    
    //Backend logic
    try {
      const checkRes = await axios.get(`http://localhost:3001/users?email=${email}`);
      
      if (checkRes.data.length > 0) {
        setErrors({ email: "This email is already registered" });
        return;
      }

      //Creating User Object
      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password
      };

      // 3. Post to DB
      await axios.post("http://localhost:3001/users", newUser);
      
      alert("Account created successfully!");
      navigate("/login"); // Redirect to login page

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong connecting to the server.");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8f9fa",
        }}
      >
        <Card sx={{ width: 900, p: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              {/*Left Content*/}
              <Box sx={{ flex: 1, pr: 4 }}>
                {/* Logo */}
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="#1a73e8"
                  mb={1}
                >
                  Fundoo
                </Typography>

                <Typography fontWeight={500} mb={3} style={{fontSize: '2rem'}}>
                  Create your Fundoo Account
                </Typography>

                {/* Name */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    label="First name"
                    fullWidth
                    inputRef={firstNameRef}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    label="Last name"
                    fullWidth
                    inputRef={lastNameRef}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Box>

                {/* Email */}
                <TextField
                  label="Your email address"
                  fullWidth
                  sx={{ mb: 1 }}
                  inputRef={emailRef}
                  error={!!errors.email}
                  helperText={errors.email}
                />

                {/* Password */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    inputRef={passwordRef}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    label="Confirm"
                    type="password"
                    fullWidth
                    inputRef={confirmPasswordRef}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </Typography>
                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Link
                    component={RouterLink}
                    to="/login"
                    underline="none"
                    fontWeight={500}
                  >
                    Sign in instead
                  </Link>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1a73e8",
                      textTransform: "none",
                      px: 4,
                    }}
                    onClick={handleSubmit}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              {/*Right Content*/}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={shield}
                  alt="Security Illustration"
                  style={{
                    width: "80%",
                    maxWidth: "300px",
                  }}
                />
                <Typography variant="body1" align="center" mt={2}>
                  One account for all your Notes needs.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Signup;