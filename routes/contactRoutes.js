const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// GET all contacts
router.get("/contacts", getContacts);

// CREATE contact
router.post("/contacts", createContact);

// UPDATE contact (supports Lovable + REST style)
router.put("/contacts", updateContact);
router.put("/contacts/:id", updateContact);
router.patch("/contacts/:id", updateContact);

// DELETE contact
router.delete("/contacts/:id", deleteContact);

module.exports = router;
