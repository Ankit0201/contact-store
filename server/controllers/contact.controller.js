const { createError, successHandler } = require("../utils/utility");
const { tryCatchHandler } = require("../utils/utility");
const ContactModel = require("../models/Contact.model");
const xml2js = require("xml2js");

const addContact = tryCatchHandler(async (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const userDetails = await ContactModel.findOne({ phoneNumber });

  if (userDetails) {
    return next(
      createError(409, "User is already exist with this phone number")
    );
  }

  let savedUser = new ContactModel({ firstName, lastName, phoneNumber });

  await savedUser.save();

  return successHandler(res, "Successfully created");
});

const fetchAllContacts = tryCatchHandler(async (req, res, next) => {
  const {phoneNumber} = req.query;
  const allContacts = await ContactModel.aggregate([
    {
      $match:  { phoneNumber: { $regex: phoneNumber,$options: "i" } }    
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $project: {
        id: '$_id',
        firstName: 1,
        lastName: 1,
        phoneNumber: 1,
      }
    }
  ]);

  return successHandler(res, "Successfully fetched", allContacts);
});

const fetchContactById = tryCatchHandler(async (req, res, next) => {
  const { id } = req.params;
  const singleContact = await ContactModel.findById(id);

  return successHandler(res, "Successfully created", singleContact);
});

const updateContact = tryCatchHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findById(id);

  if (!contact) {
    return next(createError(404, "User not found"));
  }

  await ContactModel.update({ _id: id }, req.body);

  return successHandler(res, "Successfully updated");
});

const deleteContact = tryCatchHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findById(id);

  if (!contact) {
    return next(createError(404, "User not found"));
  }

  await ContactModel.deleteOne({ _id: id });

  return successHandler(res, "Successfully deleted");
});

const bulkUploadContact = tryCatchHandler(async (req, res, next) => {
  if (!req.file) {
    return next(createError(500, "Please Uplaod file"));
  }
  
  if(!req.file.mimetype.includes('xml')){
    return next(createError(500, "Only xml files are allowed"));
  }

  const fileContent = req.file.buffer.toString();
  xml2js.parseString(fileContent, async (parseErr, result) => {
    if (parseErr) {
      return next(createError(500, "Error parsing XML"));
    }

    if (!result.contacts || !result.contacts.contact) {
      return next(createError(500, "Upload correct format"));
    }

    const contacts = result.contacts.contact;
    const savedPhoneNumbers = await ContactModel.distinct("phoneNumber");
    for (const contact of contacts) {

      // Check if the phone number already exists in the database
      if (!savedPhoneNumbers.includes(contact.phone[0])) {

        const newContact = new ContactModel({
          firstName: contact.name[0],
          lastName: contact.lastName[0],
          phoneNumber: contact.phone[0],
        });
        await newContact.save();
      }
    }
    return successHandler(res, "All contacts successfully saved");
  });
});

module.exports = {
  addContact,
  fetchAllContacts,
  fetchContactById,
  updateContact,
  deleteContact,
  bulkUploadContact,
};
