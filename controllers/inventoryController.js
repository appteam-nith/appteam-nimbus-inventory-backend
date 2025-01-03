const Inventory = require('../models/inventoryModel');

exports.addInventory = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const inventory = new Inventory({ name, description, quantity, addedBy: req.user._id });
    await inventory.save();
    res.status(201).json({ message: 'Inventory item added', inventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const inventory = await Inventory.findByIdAndUpdate(id, updates, { new: true });
    if (!inventory) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Inventory updated', inventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByIdAndDelete(id);
    if (!inventory) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Inventory deleted', inventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};