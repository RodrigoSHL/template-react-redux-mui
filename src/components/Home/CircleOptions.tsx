import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

const CircleOptions = () => {
  const { startLogout, user, status } = useAuthStore();
  let navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {status === "authenticated" ? (
          <MenuItem onClick={startLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>
            <Typography textAlign="center">Login</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default CircleOptions;
