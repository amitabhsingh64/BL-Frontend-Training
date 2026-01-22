import { Popover, Paper, Box, Typography } from "@mui/material";
import { useState } from "react";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import groceryImg from '../../assets/colorPalletBgImg/grocery_light_thumb_0615.svg';
import foodImg from '../../assets/colorPalletBgImg/food_light_thumb_0615.svg';
import travelImg from '../../assets/colorPalletBgImg/travel_light_thumb_0615.svg';
import placesImg from '../../assets/colorPalletBgImg/places_light_thumb_0615.svg';
import videoImg from '../../assets/colorPalletBgImg/video_light_thumb_0615.svg';
import celebrationImg from '../../assets/colorPalletBgImg/celebration_light_thumb_0715.svg';
import recipeImg from '../../assets/colorPalletBgImg/recipe_light_thumb_0615.svg';
import default_bg_color from "../../assets/bg_color_default.png";
import dropper from "../../assets/dropper.png";

function ColorPallet({ openState, anchorEl, onClose, onColorSelect, onBackgroundSelect }) {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedBackground, setSelectedBackground] = useState(0);

    const colors = [
        { icon: <ClearOutlinedIcon sx={{ fontSize: 16 }} />, label: "no color", color: '#ffffff' },
        { color: '#faafa8' }, { color: '#f39f76' }, { color: '#fff8b8' },
        { color: '#e2f6d3' }, { color: '#b4ddd3' }, { color: '#d4e4ed' },
        { color: '#aeccdc' }, { color: '#d3bfdb' }, { color: '#f6e2dd' },
        { color: '#e9e3d4' }, { color: '#efeff1' }
    ];

    const backgrounds = [
        { icon: <ClearOutlinedIcon sx={{ fontSize: 20 }} />, label: 'No background' },
        { img: groceryImg, label: 'Grocery' }, { img: foodImg, label: 'Food' },
        { img: travelImg, label: 'Travel' }, { img: placesImg, label: 'Places' },
        { img: videoImg, label: 'Video' }, { img: celebrationImg, label: 'Celebration' },
        { img: recipeImg, label: 'Recipe' }
    ];

    return (
        <Popover
            open={openState}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
            <Paper sx={{ 
                p: 2, 
                backgroundColor: 'white', 
                borderRadius: 2, 
                boxShadow: 3, 
                maxWidth: '600px',
                width: 'fit-content'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            scrollbarWidth: 'none'
                        }}>
                            {colors.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        width: 32, height: 32,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 26, height: 26,
                                            borderRadius: '50%',
                                            backgroundColor: item.color || 'white',
                                            cursor: 'pointer',
                                            border: index === 0 ? '2px solid #e0e0e0' : '1px solid #e0e0e0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'transform 0.1s',
                                            '&:hover': { border: '2px solid #000' }
                                        }}
                                        onClick={() => { setSelectedColor(index); if (onColorSelect) onColorSelect(index); }}
                                    >
                                        {item.icon ? item.icon : null}
                                    </Box>
                                    {selectedColor === index && (
                                        <CheckCircleOutlinedIcon
                                            sx={{
                                                position: 'absolute', top: -4, right: -4, 
                                                color: '#7e57c2', fontSize: 14,
                                                backgroundColor: 'white', borderRadius: '50%', zIndex: 2
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            scrollbarWidth: 'none'
                        }}>
                            {backgrounds.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        width: 42, height: 42,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40, height: 40,
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            border: '1px solid #e0e0e0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            overflow: 'hidden', 
                                            '&:hover': { border: '2px solid #000' }
                                        }}
                                        onClick={() => { setSelectedBackground(index); if (onBackgroundSelect) onBackgroundSelect(index); }}
                                    >
                                        {item.icon ? item.icon : <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                    </Box>
                                    
                                    {/* Standard Tick for Large Circles */}
                                    {selectedBackground === index && (
                                        <CheckCircleOutlinedIcon
                                            sx={{
                                                position: 'absolute',
                                                top: -2, right: -2,
                                                color: '#7e57c2',
                                                fontSize: 20, // Standard Tick size
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                zIndex: 10,
                                                boxShadow: '0px 1px 3px rgba(0,0,0,0.2)'
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                </Box>
            </Paper>
        </Popover>
    )
}

export default ColorPallet;