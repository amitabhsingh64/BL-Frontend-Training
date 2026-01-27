import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Box, Grid, CircularProgress, Typography } from "@mui/material"; 
import Header from "../../components/headerComponent/headerComponent";
import Sidebar from "../../components/sideBar/sideBar";
import NoteCard from "../../components/noteCard/noteCard"; 

const drawerWidth = 240; 

const Trash = () => {
  const [open, setOpen] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchTrashNotes = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user ? user.id : null;

            const response = await axios.get("http://localhost:3000/notes");
            
            const trashNotes = response.data.filter(note => 
                note.userId === userId && note.isTrash === true
            );
            
            setNotesList(trashNotes.reverse()); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trash notes:", error);
            setLoading(false);
        }
    };

    fetchTrashNotes();
  }, [refreshTrigger]);

  const autoRefresh = () => {
      setRefreshTrigger(prev => !prev);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggle={toggle} />
      
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box 
        component="main" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: 2,
          marginLeft: open ? `${drawerWidth}px` : '0px', 
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%', 
          transition: 'margin 0.3s ease, width 0.3s ease',
        }}
      >

        <Box sx={{ width: '100%', maxWidth: '1400px', mt: 5, px: 3 }}>

          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>
          ) : notesList.length === 0 ? (
             <Typography variant="body1" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
                Trash is empty.
             </Typography>
          ) : (
            <Grid container spacing={2}>
                {notesList.map((note) => (
                <Grid 
                    item xs={12} sm={6} md={4} lg={3} key={note.id}
                    sx={{ '@media (min-width: 1200px)': { flexBasis: '20%', maxWidth: '20%' } }}
                >
                    <NoteCard note={note} autoRefresh={autoRefresh} />
                </Grid>
                ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Trash;