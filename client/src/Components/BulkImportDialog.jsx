import {
  Dialog,
  DialogTitle,
  Button,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { bulkContactUpload } from "../services/restApi";
import { useLoader } from "../services/LoaderContextProvider";
import { useNavigate } from "react-router-dom";

const BulkImport = ({ handleBulkImport }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { showLoader, hideLoader, showToaster } = useLoader();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setErrorMessage(null);
    if (!selectedFile.type.includes("xml")) {
      setErrorMessage("Only xml file are allowed");
      return;
    }

    showLoader();
    let formData = new FormData();
    formData.append("file", selectedFile);

    try {
      let uploadedDetails = await bulkContactUpload(formData);
      hideLoader();
      showToaster(uploadedDetails.message);
      navigate("/view-contacts");
    } catch (error) {
      hideLoader();
      showToaster(error.message, "error");
    }
  };

  return (
    <Dialog open onClose={handleBulkImport}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Import Bulk Contacts</DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleBulkImport}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>

        <Box component="form">
          <TextField
            type="file"
            inputProps={{ accept: ".xml" }}
            onChange={handleFileChange}
            sx={{
              marginBottom: "20px",
            }}
          />
          {errorMessage && (
            <Typography color="error" sx={{ marginBottom: "20px" }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={handleUpload}
            disabled={!selectedFile || (errorMessage ? true : false)}
          >
            Upload
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default BulkImport;
