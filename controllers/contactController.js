const Contact = require("../models/Contact");

// GET /api/contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// POST /api/contacts
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      category, // ✅ category saved on create
      message,
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

// PUT or PATCH /api/contacts OR /api/contacts/:id
exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id || req.body._id || req.body.id;

    if (!contactId) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body, // allows partial updates including category
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};
