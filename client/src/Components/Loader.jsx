import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        opacity: "0.5",
        background: "gainsboro",
        height: "100vh",
        width: "100%",
        zIndex: "9999",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
