import React, { useState } from "react";
import Header from "../../components/headerComponent/headerComponent";
import Sidebar from "../../components/sideBar/sideBar";
import { Outlet } from "react-router-dom";
import AddNotesBlock from "../../components/addNotesBlock/addNotesBlock";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <Header toggle={toggle} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <AddNotesBlock/>
      <Outlet/>
    </>
  );
};

export default Dashboard;