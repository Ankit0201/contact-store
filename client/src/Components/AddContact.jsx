import { Suspense, lazy, useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Container,
  Tooltip,
  IconButton,
  Backdrop,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import {
  ContactPhone,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { orange } from "../constant/constant";
import {
  addContacts,
  fetchContactById,
  updateContact,
} from "../services/restApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoader } from "../services/LoaderContextProvider";
import {  useFormik } from "formik";
import { validationSchema } from "../schema/validation";

const BulkImportDialog = lazy(() => import("./BulkImportDialog"));

const AddContact = () => {
  const location = useLocation();
  const [openBulkImport, setOpenBulkImport] = useState(false);
  const [editId, setEditId] = useState(null);
  const { showLoader, hideLoader, showToaster } = useLoader();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    showLoader();
    if (editId) {
      handleUpdate(values);
    } else {
      try {
        const result = await addContacts(values);
        if (result) {
          hideLoader();
          showToaster(result.message);
          formik.resetForm();
        }
      } catch (error) {
        showToaster(error.message || "Something went wrong", "error");
        hideLoader();
      }
    }
  };

  const handleUpdate = async (values) => {
    try {
      const result = await updateContact(values, editId);
      hideLoader();
      showToaster(result.message);
      navigate("/view-contacts");
    } catch (error) {
      hideLoader();
      showToaster(error.message, "error");
    }
  };

  const handleBulkImport = (event) => {
    setOpenBulkImport((prev) => !prev);
  };

  const fetchDataById = async (id) => {
    try {
      showLoader();
      let { data } = await fetchContactById(id);
      formik.setValues({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });
      hideLoader();
    } catch (error) {
      hideLoader();
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      setEditId(id);
      fetchDataById(id);
    } else {
      setEditId(null);
    }
  }, [location.search]);

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid gainsboro",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ContactPhone />
          </Avatar>
          <Typography component="h1" variant="h5">
            {editId ? "Update" : "Add"} Contact
          </Typography>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "50px",
              marginBottom: "20px",
            }}
          >
            <Tooltip title="Bulk Import" placement="top">
              <IconButton
                color="inherit"
                size="large"
                style={{ backgroundColor: orange }}
                onClick={handleBulkImport}
              >
                <UploadFileIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName ? (
                  <Typography color="error">
                    {formik.errors.firstName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName ? (
                  <Typography color="error">
                    {formik.errors.lastName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                {formik.errors.phoneNumber ? (
                  <Typography color="error">
                    {formik.errors.phoneNumber}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.isValid || !formik.dirty}
            >
              {editId ? "UPDATE" : "SUBMIT"}
            </Button>
          </form>
        </Box>
      </Container>

      {openBulkImport && (
        <Suspense fallback={<Backdrop open />}>
          <BulkImportDialog handleBulkImport={handleBulkImport} />
        </Suspense>
      )}
    </>
  );
};

export default AddContact;
