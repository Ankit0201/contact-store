import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Box, IconButton, Grid, TextField } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { deleteContact, fetchAllContacts } from "../services/restApi";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../services/LoaderContextProvider";
import NoContact from "./NoContact";
import { debounce } from "lodash";

export default function ViewContact() {
  const [allContacts, setAllContacts] = useState([]);
  const navigate = useNavigate();
  const { showLoader, hideLoader, showToaster } = useLoader();
  const [filterConfig, setFilterConfig] = useState({
    phoneNumber: "",
  });

  const columns = [
    {
      field: "firstName",
      sortable: false,
      resizable: false,
      filterable: false,
      headerName: "First name",
      width: 200,
    },
    {
      field: "lastName",
      sortable: false,
      resizable: false,
      filterable: false,
      headerName: "Last name",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      sortable: false,
      resizable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      resizable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            sx={{ marginRight: 1 }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      showLoader();
      const deleted = await deleteContact(id);
      if (deleted) {
        showToaster(deleted.message);
        getAllContacts();
      }
    } catch (error) {
      hideLoader();
      showToaster(error.message, "error");
    }
  };

  const getAllContacts = async () => {
    try {
      showLoader();
      const resp = await fetchAllContacts(filterConfig);
      if (resp && resp.data) {
        setAllContacts(resp.data);
      }

      hideLoader();
    } catch (error) {
      showToaster("Unable to fetch", "error");
      hideLoader();
    }
  };

  const handleFilter = debounce((e, key) => {
    setFilterConfig({ ...filterConfig, [key]: e.target.value });
  }, 500);

  useEffect(() => {
    getAllContacts();
  }, [filterConfig]);
  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Box
            sx={{
              marginBottom: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Search by Phone Number"
                  name="phoneNumber"
                  type="text"
                  onChange={(e) => handleFilter(e, "phoneNumber")}
                />
              </Grid>
            </Grid>
          </Box>
          {allContacts.length > 0 ? (
            <DataGrid
              rows={allContacts}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableColumnMenu
              disableSelectionOnClick
            />
          ) : (
            <NoContact></NoContact>
          )}
        </Box>
      </Container>
    </>
  );
}
