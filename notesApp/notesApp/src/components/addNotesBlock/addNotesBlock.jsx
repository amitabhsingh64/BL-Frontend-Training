import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import IconComponent from '../icon/iconsComponent';   


function addNotesBlock() {
  const [expanded, setExpanded] = useState(false);
  const handleclick=()=>{
    setExpanded(true);
  }
  return (
   <Box
  sx={{display:'flex', '& .MuiPaper-root': {width:'50%', height:'70%'},ml:60,mt:15, flexDirection:'row'}}>
  <Paper elevation={3} sx={{ p: 2, width: '70%' }}>
    {!expanded ? (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Take a note..."
          style={{
            width: '80%',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            resize: 'none'
          }}
          onClick={handleclick}
        />

        <CheckBoxOutlinedIcon style={{color: '#83878b'}}/>
        <BrushOutlinedIcon sx={{ ml: 2 }} style={{color: '#83878b'}} />
        <ImageOutlinedIcon sx={{ ml: 2 }} style={{color: '#83878b'}} />
      </Box>
    ) : (
      <IconComponent setExpanded={setExpanded} />
    )}
  </Paper>
</Box>
  )
}

export default addNotesBlock