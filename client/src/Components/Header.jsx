import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon, ContactPhone } from "@mui/icons-material";
import { orange } from "../constant/constant";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Box
        height={"4rem"}
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography>Contact Store</Typography>
            <Box
              sx={{
                flexGrow: 1,
              }}
            ></Box>

            <Box>
              <Tooltip title="Add New Contact">
                <Link to="/" style={{ color: "white" }}>
                  <IconButton color="inherit" size="large">
                    <AddIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="View Contact List">
                <Link to="/view-contacts" style={{ color: "white" }}>
                  <IconButton color="inherit" size="large">
                    <ContactPhone />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
export default Header;
