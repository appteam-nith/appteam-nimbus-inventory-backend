const SpecialRequest = require("../models/specialRequestModel");

exports.createSpecialRequest = async (req, res) => {
  try {
    const { ask } = req.body;
    const specialRequest = new SpecialRequest({
      club: req.user.club,
      coordinator: req.user._id,
      ask,
    });
    await specialRequest.save();
    res.status(201).json({ message: "SpecialRequest created", specialRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelSpecialRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const specialRequest = await SpecialRequest.findByIdAndUpdate(
      id,
      { status: "canceled" },
      { new: true }
    );
    if (!specialRequest)
      return res.status(404).json({ error: "SpecialRequest not found" });
    res
      .status(200)
      .json({ message: "SpecialRequest canceled", specialRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSpecialRequests = async (req, res) => {
  try {
    const specialRequests = await SpecialRequest.find().populate(
      "coordinator",
      "name email"
    );
    res.status(200).json({ specialRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMySpecialRequests = async (req, res) => {
  try {
    const specialRequests = await SpecialRequest.find({
      club: req.user.club,
    }).populate("coordinator", "name email");
    res.status(200).json({ specialRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecialRequestsByClub = async (req, res) => {
  try {
    const { clubName } = req.params;
    const specialRequests = await SpecialRequest.find({
      club: clubName,
    }).populate("coordinator", "name email");
    res.status(200).json({ specialRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecialRequestsByItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const specialRequests = await SpecialRequest.find({
      "items.inventoryId": itemId,
    }).populate("coordinator", "name email");
    res.status(200).json({ specialRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSpecialRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const specialRequest = await SpecialRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!specialRequest)
      return res.status(404).json({ error: "SpecialRequest not found" });
    res
      .status(200)
      .json({ message: "SpecialRequest status updated", specialRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
