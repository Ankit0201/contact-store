import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NoContact = () => {
  return (
    <Container compnent="main" maxWidth="sm">
      <Box
        sx={{
          border: "1px solid gainsboro",
          padding: "20px",
        }}
      >
        <Typography variant="h4">No Contacts Found</Typography>
        <Box>
          <Link to="/">
            <IconButton>
              <Button>Go to Add Contact</Button>
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default NoContact;
