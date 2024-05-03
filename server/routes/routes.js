const express = require("express");
const {
  addContact,
  fetchAllContacts,
  fetchContactById,
  updateContact,
  deleteContact,
  bulkUploadContact,
} = require("../controllers/contact.controller");
const singleFileUplaod = require("../utils/multer")

const router = express.Router();

router.post("/add", addContact);
router.get("/", fetchAllContacts);
router
  .route("/:id")
  .get(fetchContactById)
  .put(updateContact)
  .delete(deleteContact);
router.post("/bulkUpload",singleFileUplaod,bulkUploadContact)

module.exports = router;
