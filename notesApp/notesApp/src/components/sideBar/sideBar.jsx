import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 1. Import Hooks
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/EditOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const HEADER_HEIGHT = 64;

export default function Sidebar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Notes", icon: <LightbulbOutlinedIcon />, path: "/dashboard" },
    { text: "Reminders", icon: <NotificationsNoneOutlinedIcon />, path: "/reminders" },
    { text: "Edit labels", icon: <EditIcon />, path: "/labels" },
    { text: "Archive", icon: <ArchiveOutlinedIcon />, path: "/archive" },
    { text: "Trash", icon: <DeleteOutlineOutlinedIcon />, path: "/trash" },
  ];

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: HEADER_HEIGHT,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: open ? 200 : 60,
          transition: "width .1s",
          overflowX: "hidden",
          borderRight: "none",
          boxShadow: open ? "8px 0 10px rgba(0,0,0,0.10)" : "none",
          
        },
      }}
    >
      <Box sx={{ mx: 1 }} fontWeight={400}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              // 5. Navigate on Click
              onClick={() => navigate(item.path)} 
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: 0.4,
                my: 1,
                px: 2.5,
                mb: 1,
                borderRadius: "0 25px 25px 0",
                backgroundColor: location.pathname === item.path ? "#feefc3" : "transparent",
                "&:hover": { backgroundColor: "#feefc3" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 2 : "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  whiteSpace: "nowrap",
                  opacity: open ? 1 : 0,
                  transition: "opacity 0.2s ease-in-out",
                  visibility: open ? "visible" : "hidden",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}