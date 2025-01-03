const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image:{
      type: String
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Added by a core team member
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);