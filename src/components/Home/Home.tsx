import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "../../routes/Navigation";
import Snackbar from "../Middleware/Snackbar";
import DrawerBar from "./DrawerBar/DrawerBar";
import NavBar from "./NavBar/NavBar";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen}/>
      <DrawerBar open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Navigation />
        <Snackbar/>
      </Box>
    </Box>
  );
}
