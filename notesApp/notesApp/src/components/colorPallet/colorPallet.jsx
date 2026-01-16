import { Popover } from "@mui/material";
import { useState } from "react";

function ColorPallet() {
  const [open,setState]=useState('closed');
  const handleclick=()=>{
    setExpanded(true);
  }
  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      The content of the Popover.
    </Popover>
  )
}

export default ColorPallet;
