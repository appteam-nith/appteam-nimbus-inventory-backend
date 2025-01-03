const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    club: {
      type: String,
      required: true, // Club making the request
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Club coordinator who made the request
      required: true,
    },
    items: [
      {
        inventoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);