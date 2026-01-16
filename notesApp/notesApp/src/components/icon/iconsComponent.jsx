import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';




function IconComponent({setExpanded}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextareaAutosize
          aria-label="note title"
          placeholder="Title"
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1.2rem',
            resize: 'none',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <PushPinOutlinedIcon style={{color: '#83878b'}}  />
          </div>
        </div>

        <TextareaAutosize
          aria-label="note content"
          placeholder="Take a note..."
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            resize: 'none',
            fontWeight: 'lighter'
          }}
        />
        <div style={{ display: 'flex', marginTop: '10px' ,flexDirection:'row' }} >
          <Tooltip title="Formatting options">
        <FormatColorTextOutlinedIcon sx={{opacity:0.5}} style={{cursor: 'pointer'}}/>
        </Tooltip>
        <Tooltip title="Change color">
        <ColorLensOutlinedIcon sx={{ ml: 3 ,opacity:0.5}} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="Remind me">
        <AddAlertOutlinedIcon sx={{ ml: 3,opacity:0.5 }} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="Collaborator">
        <PersonAddAlt1OutlinedIcon sx={{ ml: 3,opacity:0.5 }} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="Add Imag">
        <ImageOutlinedIcon sx={{ ml: 3,opacity:0.5 }} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="Archive">
        <ArchiveOutlinedIcon sx={{ ml: 3,opacity:0.5 }} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="More options">
        <MoreVertOutlinedIcon sx={{ ml: 3,opacity:0.5 }} style={{cursor: 'pointer'}} />
        </Tooltip>
        <Typography sx={{marginLeft:'auto',mr:2,color:'black',borderRadius:'8px',cursor:'pointer'}} style={{color: '#83878b'}}  onClick={(e)=> setExpanded(false)}>
          Close
        </Typography>
        </div>
      </Box>
  )
}

export default IconComponent