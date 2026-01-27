import React, { useState } from "react";
import axios from "axios"; 
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { TextareaAutosize } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import IconComponent from "../icon/iconsComponent";

// Imports
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

function AddNotesBlock({ autoRefresh }) {
  const [expanded, setExpanded] = useState(false);
  
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedBackground, setSelectedBackground] = useState(0);

  const handleclick = () => {
    setExpanded(true);
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim() && !text.trim()) {
      setExpanded(false);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    if (!userId) {
      alert("Please login to save notes");
      return;
    }

    const newNote = {
        userId: userId, 
        title: title,
        text: text,
        bgColor: selectedColor > 0 ? colors[selectedColor].color : "#ffffff",
        bgImage: selectedBackground > 0 ? backgrounds[selectedBackground].img : "",
        // --- IMPORTANT ADDITIONS ---
        isTrash: false, 
        isArchive: false
    };

    try {
        await axios.post("http://localhost:3000/notes", newNote);
        console.log("Note saved:", newNote);
        
        // 2. TRIGGER AUTO REFRESH
        if (autoRefresh) {
            autoRefresh();
        }

        // Reset and Close
        setTitle("");
        setText("");
        setSelectedColor(0);
        setSelectedBackground(0);
        setExpanded(false);
        
    } catch (error) {
        console.error("Error saving note:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
      <Paper
        elevation={3}
        sx={{
          p: 1,
          width: "600px",
          minHeight: expanded ? "100px" : "46px",
          height: "auto",
          backgroundColor: colors[selectedColor]?.color || "#ffffff",
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          transition: "min-height 0.3s ease-in-out",
        }}
      >
        {/* BG IMAGE LAYER */}
        {expanded && selectedBackground > 0 && (
          <Box
            sx={{
              position: "absolute", top: 0, right: 0, left: 0, width: "100%", height: "70%", 
              backgroundImage: `url(${backgrounds[selectedBackground].img})`,
              backgroundSize: "cover", backgroundPosition: "right bottom", zIndex: 0, opacity: 0.9,
            }}
          />
        )}

        {/* CONTENT LAYER */}
        <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>
          {!expanded ? (
            <Box sx={{ display: "flex", alignItems: "center", height: "100%", pl: 1 }}>
              <TextareaAutosize
                placeholder="Take a note..."
                style={{
                  flexGrow: 1, border: "none", outline: "none", fontSize: "1rem", fontWeight: 500, resize: "none", backgroundColor: "transparent", cursor: "text",
                }}
                onClick={handleclick}
              />
              <Box sx={{ display: "flex", gap: 2, color: "#5f6368", mr: 2 }}>
                <CheckBoxOutlinedIcon />
                <BrushOutlinedIcon />
                <ImageOutlinedIcon />
              </Box>
            </Box>
          ) : (
            <IconComponent
              setExpanded={setExpanded}
              onColorSelect={setSelectedColor}
              onBackgroundSelect={setSelectedBackground}
              selectedBackground={selectedBackground}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              onSave={handleSave} 
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default AddNotesBlock;