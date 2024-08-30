import User from "../models/user.js";

const updateFieldController = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body; // Expecting { fieldName: newValue, ... }
  
    try {
      const result = await User.findByIdAndUpdate(userId, updates, { new: true });
  
      if (result) {
        res.status(200).json({ message: 'User updated successfully', user: result });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

export default updateFieldController