import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ColorPallet from "../colorPallet/colorPallet"; 
import groceryImg from "../../assets/colorPalletBgImg/grocery_light_thumb_0615.svg";
import foodImg from "../../assets/colorPalletBgImg/food_light_thumb_0615.svg";
import travelImg from "../../assets/colorPalletBgImg/travel_light_thumb_0615.svg";
import placesImg from "../../assets/colorPalletBgImg/places_light_thumb_0615.svg";
import videoImg from "../../assets/colorPalletBgImg/video_light_thumb_0615.svg";
import celebrationImg from "../../assets/colorPalletBgImg/celebration_light_thumb_0715.svg";
import recipeImg from "../../assets/colorPalletBgImg/recipe_light_thumb_0615.svg";
import default_bg_color from "../../assets/bg_color_default.png";
import dropper from "../../assets/dropper.png";

const colors = [
  { img: dropper, label: "no color" },
  { color: "#faafa8" },{ color: "#f39f76" },{ color: "#fff8b8" },
  { color: "#e2f6d3" },{ color: "#b4ddd3" },{ color: "#d4e4ed" },
  { color: "#aeccdc" },{ color: "#d3bfdb" },{ color: "#f6e2dd" },
  { color: "#e9e3d4" },{ color: "#efeff1" },
];

const backgrounds = [
  { img: default_bg_color, label: "No background" },
  { img: groceryImg, label: "Grocery" }, { img: foodImg, label: "Food" },
  { img: travelImg, label: "Travel" }, { img: placesImg, label: "Places" },
  { img: videoImg, label: "Video" }, { img: celebrationImg, label: "Celebration" },
  { img: recipeImg, label: "Recipe" },
];

function NoteCard({ note, autoRefresh }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [paletteAnchorEl, setPaletteAnchorEl] = useState(null);
  const isPaletteOpen = Boolean(paletteAnchorEl);

  const handleSelection = () => setIsSelected(!isSelected);
  const handlePaletteClick = (event) => {
    event.stopPropagation(); 
    setPaletteAnchorEl(event.currentTarget);
  };

  const handlePaletteClose = () => {
    setPaletteAnchorEl(null);
  };
  const handleColorUpdate = async (type, index) => {
      try {
          let updateData = {};
          
          if (type === 'color') {
             const newColor = index === 0 ? "#ffffff" : colors[index].color;
             updateData = { bgColor: newColor, bgImage: "" };
          } else if (type === 'image') {
             const newImage = index === 0 ? "" : backgrounds[index].img;
             updateData = { bgImage: newImage, bgColor: "#ffffff" };
          }

          await axios.patch(`http://localhost:3000/notes/${note.id}`, updateData);
          
          if (autoRefresh) autoRefresh();
      } catch (error) {
          console.error("Error updating color:", error);
      }
  };
  const trashNote = async (e) => {
    e.stopPropagation();
    try {
        if (note.isTrash) {
            await axios.delete(`http://localhost:3000/notes/${note.id}`);
        } else {
            await axios.patch(`http://localhost:3000/notes/${note.id}`, {
                isTrash: true,
                isArchive: false
            });
        }
        if (autoRefresh) autoRefresh();
    } catch (error) {
        console.error("Error trashing note:", error);
    }
  };

  const archiveNote = async (e) => {
    e.stopPropagation();
    try {
        await axios.patch(`http://localhost:3000/notes/${note.id}`, {
            isArchive: !note.isArchive,
            isTrash: false
        });
        if (autoRefresh) autoRefresh();
    } catch (error) {
        console.error("Error archiving note:", error);
    }
  };
  const restoreNote = async (e) => {
      e.stopPropagation();
      try {
          await axios.patch(`http://localhost:3000/notes/${note.id}`, {
              isTrash: false,
              isArchive: false
          });
          if (autoRefresh) autoRefresh();
      } catch (error) {
          console.error("Error restoring note:", error);
      }
  }

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelection}
      sx={{
        width: "100%",
        maxWidth: "300px",
        borderRadius: 2,
        backgroundColor: note.bgColor || "#ffffff",
        border: isSelected ? "2px solid #000" : "1px solid #e0e0e0",
        position: "relative",
        ml: 10,
        mt: 5,
        cursor: "default",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        },
        overflow: "visible",
      }}
      elevation={0}
    >
      {note.bgImage && (
        <Box
          sx={{
            position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
            backgroundImage: `url(${note.bgImage})`, backgroundSize: "cover", backgroundPosition: "center bottom",
            opacity: 0.9, zIndex: 0, pointerEvents: "none",
          }}
        />
      )}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <IconButton
          size="small"
          sx={{
            position: "absolute", top: 5, right: 5,
            opacity: isHovered ? 1 : 0, transition: "opacity 0.2s",
          }}
        >
          <PushPinOutlinedIcon fontSize="small" />
        </IconButton>

        <CardContent sx={{ pb: 0, minHeight: "100px" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500, fontSize: "1rem", mb: 1, wordWrap: "break-word" }}>
            {note.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ wordWrap: "break-word", mb: 2 }}>
            {note.text}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between", px: 1,
            opacity: isHovered || isPaletteOpen ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {note.isTrash ? (
             <>
                <Tooltip title="Restore">
                    <IconButton size="small" onClick={restoreNote}>
                        <RestoreFromTrashOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Forever">
                    <IconButton size="small" onClick={trashNote}>
                        <DeleteForeverOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
             </>
          ) : (
             <>
                <Tooltip title="Remind me"><IconButton size="small"><AddAlertOutlinedIcon fontSize="inherit" /></IconButton></Tooltip>
                <Tooltip title="Collaborator"><IconButton size="small"><PersonAddAlt1OutlinedIcon fontSize="inherit" /></IconButton></Tooltip>
                <Tooltip title="Background options">
                    <IconButton size="small" onClick={handlePaletteClick}>
                        <ColorLensOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add image"><IconButton size="small"><ImageOutlinedIcon fontSize="inherit" /></IconButton></Tooltip>
                <Tooltip title="Archive">
                    <IconButton size="small" onClick={archiveNote}>
                        <ArchiveOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton size="small" onClick={trashNote}>
                        <DeleteOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="More"><IconButton size="small"><MoreVertOutlinedIcon fontSize="inherit" /></IconButton></Tooltip>
             </>
          )}
        </CardActions>
      </Box>
      <ColorPallet 
        openState={isPaletteOpen} 
        anchorEl={paletteAnchorEl} 
        onClose={handlePaletteClose} 
        onColorSelect={(index) => handleColorUpdate('color', index)}
        onBackgroundSelect={(index) => handleColorUpdate('image', index)}
      />

    </Card>
  );
}

export default NoteCard;