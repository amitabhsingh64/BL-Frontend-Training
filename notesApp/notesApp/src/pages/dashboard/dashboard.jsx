import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Box, Grid, CircularProgress, Typography } from "@mui/material"; 
import Header from "../../components/headerComponent/headerComponent";
import Sidebar from "../../components/sideBar/sideBar";
import { Outlet } from "react-router-dom";
import AddNotesBlock from "../../components/addNotesBlock/addNotesBlock";
import NoteCard from "../../components/noteCard/noteCard"; 

const drawerWidth = 240; 

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchNotes = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user ? user.id : null;

            const response = await axios.get("http://localhost:3000/notes");
            const myNotes = response.data.filter(note => 
                note.userId === userId && 
                note.isTrash !== true && 
                note.isArchive !== true
            );
            
            setNotesList(myNotes.reverse()); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setLoading(false);
        }
    };

    fetchNotes();
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
          display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2,
          marginLeft: open ? `${drawerWidth}px` : '0px', 
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%', 
          transition: 'margin 0.3s ease, width 0.3s ease',
        }}
      >
        <AddNotesBlock autoRefresh={autoRefresh} />

        <Box sx={{ width: '100%', maxWidth: '1400px', mt: 5, px: 3 }}>
          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>
          ) : notesList.length === 0 ? (
             <Typography variant="body1" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
                Your notes appear here
             </Typography>
          ) : (
            <Grid container spacing={2}>
                {notesList.map((note) => (
                <Grid 
                    item xs={12} sm={6} md={4} lg={3} key={note.id}
                    sx={{ '@media (min-width: 1200px)': { flexBasis: '20%', maxWidth: '20%' } }}
                >
                    {/* CRITICAL: Pass autoRefresh so trashing a note updates this list instantly */}
                    <NoteCard note={note} autoRefresh={autoRefresh} />
                </Grid>
                ))}
            </Grid>
          )}
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;