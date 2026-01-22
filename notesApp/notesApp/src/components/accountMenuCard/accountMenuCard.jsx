import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountMenu = ({ anchorEl, onClose }) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // 1.user data from Local Storage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 2.Dynamic values
  const firstName = user.firstName || "Guest";
  const lastName = user.lastName || "";
  const email = user.email || "No email";
  const fullName = `${firstName} ${lastName}`;
  const initial = firstName.charAt(0).toUpperCase();

  // 3. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    onClose();
    navigate("/login");
  };

  const googlePopupButtonStyle = {
    height: 50,
    bgcolor: "white",
    borderRadius: "999px 16px 16px 999px",
    textTransform: "none",
    fontWeight: 500,
    borderColor: "#8fa2ca",
    color: "#3c4043",
    "&:hover": {
      backgroundColor: "#919496",
      borderColor: "#dadce0",
      color: "#ffffff",
    },
  };
  
  const googlePopupButtonStyle2 = {
    height: 50,
    bgcolor: "white",
    borderRadius: "16px 999px 999px 16px",
    textTransform: "none",
    fontWeight: 500,
    borderColor: "#dadce0",
    color: "#3c4043",
    "&:hover": {
      backgroundColor: "#919496",
      borderColor: "#dadce0",
      color: "#ffffff",
    },
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          width: 420,
          borderRadius: 4,
          p: 2,
          bgcolor: "#c7ebfc",
        },
      }}
    >
      {/* Header row */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography align="center" variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Avatar */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: 36,
            bgcolor: "#d24b58",
          }}
        >
          {initial}
        </Avatar>
      </Box>

      {/* Greeting */}
      <Typography
        align="center"
        variant="h6"
        sx={{ mt: 1, fontWeight: 500 }}
      >
        Hey, {firstName}
      </Typography>

      {/* Manage account */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="none"
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            textTransform: "none",
            px: 3,
          }}
        >
          Manage your Fundoo Account
        </Button>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="none"
          startIcon={<AddIcon />}
          sx={googlePopupButtonStyle}
          onClick={() => navigate("/login")}
        >
          Add account
        </Button>

        <Button
          fullWidth
          variant="none"
          startIcon={<LogoutIcon />}
          sx={googlePopupButtonStyle2}
          onClick={handleLogout} 
        >
          Sign out
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Typography align="center" variant="caption" color="text.secondary">
        Privacy Policy • Terms of Service
      </Typography>
    </Popover>
  );
};

export default AccountMenu;