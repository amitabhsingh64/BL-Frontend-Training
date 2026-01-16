import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/EditOutlined';
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const HEADER_HEIGHT = 64;

export default function Sidebar({ open }) {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: HEADER_HEIGHT,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: open ? 160 : 70,
          transition: "width 10s",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ mx: 1 }} fontWeight={400}>
        <List>

          {[
            { text: "Notes", icon: <LightbulbOutlinedIcon />},
            { text: "Reminders", icon: <NotificationsNoneOutlinedIcon /> },
            {text: "Edit labels" ,icon: <EditIcon /> },
            { text: "Archive", icon: <ArchiveOutlinedIcon /> },
            { text: "Trash", icon: <DeleteOutlineOutlinedIcon /> },
          ].map(item => (
            <ListItemButton
              key={item.text}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: .4,
                my: 1,
                borderRadius: "55px",
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
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}

        </List>
      </Box>
    </Drawer>
  );
}