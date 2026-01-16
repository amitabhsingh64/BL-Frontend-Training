import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {Box,Card,CardContent,TextField, Typography, Button, Link, IconButton, InputAdornment,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let newErrors = {};

    if (!email.endsWith("@gmail.com")) {
      newErrors.email = "must end with @gmail.com";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("Login successful");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
        fontFamily: "'Google Sans', sans-serif",
      }}
    >
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>

          {/* Logo */}
          <Typography
            variant="h5"
            fontWeight={600}
            color="#1a73e8"
            mb={1}
            align="center"
          >
            Fundoo Notes
          </Typography>

          {/* Heading */}
          <Typography variant="h4" fontWeight={400} mb={1} align="center">
            Sign in
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3} align="center">
            to continue to Fundoo
          </Typography>

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            inputRef={emailRef}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Password */}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mt: 3 }}
            inputRef={passwordRef}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link underline="none" fontWeight={500} sx={{ mt: 1, display: "block" }}>
            Forgot password?
          </Link>

          {/* Info */}
          <Typography variant="body2" color="text.secondary" mt={4}>
            If first time signing in, your Fundoo Account password.
          </Typography>

          <Link underline="none" fontWeight={500}>
            Learn more
          </Link>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Link component={RouterLink} to="/signup" underline="none" fontWeight={500}>
              Create account
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

        </CardContent>
      </Card>
    </Box>
  );
}