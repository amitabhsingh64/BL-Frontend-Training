import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextareaAutosize, Tooltip } from '@mui/material';

// Icons
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import ColorPallet from '../colorPallet/colorPallet';

// 1. Accept props for title, text, and the save action
function IconComponent({ 
    setExpanded, 
    onColorSelect, 
    onBackgroundSelect, 
    title, 
    setTitle, 
    text, 
    setText, 
    onSave // This will trigger the API call in parent
}) {
    const iconRef = useRef(null);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Title Section */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextareaAutosize
                    aria-label="note title"
                    placeholder="Title"
                    // 2. Bind Value and OnChange
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '1.2rem',
                        resize: 'none',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        backgroundColor: 'transparent'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <PushPinOutlinedIcon style={{ color: '#83878b' }} />
                </div>
            </div>

            {/* Note Content Section */}
            <TextareaAutosize
                aria-label="note content"
                placeholder="Take a note..."
                // 3. Bind Value and OnChange
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    resize: 'none',
                    fontWeight: 'lighter',
                    backgroundColor: 'transparent'
                }}
            />

            {/* Bottom Toolbar */}
            <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'row', alignItems: 'center' }}>
                <Tooltip title="Formatting options">
                    <FormatColorTextOutlinedIcon sx={{ opacity: 0.5, cursor: 'pointer' }} />
                </Tooltip>
                
                <Tooltip title="Change color">
                    <ColorLensOutlinedIcon 
                        ref={iconRef} 
                        sx={{ ml: 3, opacity: 0.5, cursor: 'pointer' }} 
                        onClick={() => setIsPaletteOpen(!isPaletteOpen)} 
                    />
                </Tooltip>
                {/* ... other icons ... */}
                <Tooltip title="Add Image"><ImageOutlinedIcon sx={{ ml: 3, opacity: 0.5, cursor: 'pointer' }} /></Tooltip>
                <Tooltip title="Archive"><ArchiveOutlinedIcon sx={{ ml: 3, opacity: 0.5, cursor: 'pointer' }} /></Tooltip>
                <Tooltip title="More options"><MoreVertOutlinedIcon sx={{ ml: 3, opacity: 0.5, cursor: 'pointer' }} /></Tooltip>
                <UndoIcon sx={{ ml: 3, opacity: 0.3, cursor: 'not-allowed' }} fontSize="small"/>
                <RedoIcon sx={{ ml: 2, opacity: 0.3, cursor: 'not-allowed' }} fontSize="small"/>

                {/* 4. Trigger Save on Close */}
                <Typography 
                    sx={{ marginLeft: 'auto', mr: 2, color: 'black', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', padding: '6px 16px', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px' } }} 
                    onClick={onSave} 
                >
                    Close
                </Typography>
            </div>

            <ColorPallet 
                openState={isPaletteOpen} 
                anchorEl={iconRef.current} 
                onClose={() => setIsPaletteOpen(false)} 
                onColorSelect={onColorSelect} 
                onBackgroundSelect={onBackgroundSelect} 
            />
        </Box>
    )
}

export default IconComponent;