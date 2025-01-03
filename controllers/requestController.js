const Request = require('../models/requestModel');

exports.createRequest = async (req, res) => {
  try {
    const { items } = req.body;
    const request = new Request({ club: req.user.club, coordinator: req.user._id, items });
    await request.save();
    res.status(201).json({ message: 'Request created', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.status(200).json({ message: 'Request canceled', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('coordinator', 'name email');
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ club: req.user.club }).populate('coordinator', 'name email');
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestsByClub = async (req, res) => {
  try {
    const { clubName } = req.params;
    const requests = await Request.find({ club: clubName }).populate('coordinator', 'name email');
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestsByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const requests = await Request.find({ 'items.inventoryId': itemId }).populate('coordinator', 'name email');
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const request = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.status(200).json({ message: 'Request status updated', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};