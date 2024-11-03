const ExtendedUser = require('../../model/shop/extendedUser'); // Adjust the path as needed
const User = require('../../model/user');

// Create a new extended user
exports.createExtendedUser = async (req, res) => {

  try {
    const extendedUser = new ExtendedUser(req.body);
    await extendedUser.save();
    res.status(201).json({ message: 'Extended user created successfully', extendedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get extended user by ID
exports.getExtendedUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const extendedUser = await ExtendedUser.findById(id);

    if (!extendedUser) {
      return res.status(404).json({ error: 'Extended user not found.' });
    }

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const combinedResult = {
      ...user.toObject(),          // Spread user data
      ...extendedUser.toObject(),  // Spread extendedUser data
    };
    res.status(200).json(combinedResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get all extended users
exports.getAllExtendedUsers = async (req, res) => {
  try {
    const extendedUsers = await ExtendedUser.find();

    res.status(200).json(extendedUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing extended user

exports.updateExtendedUser = async (req, res) => {
  const { id } = req.params;

  try {

    const updatedExtendedUser = await ExtendedUser.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedExtendedUser) {
      return res.status(404).json({ error: 'Extended user not found.' });
    }
    const userUpdates = {};
    if (req.body.firstName) userUpdates.firstName = req.body.firstName;
    if (req.body.lastName) userUpdates.lastName = req.body.lastName;
    if (req.body.email) userUpdates.email = req.body.email;

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(id, userUpdates, { new: true });
    }
    res.status(200).json({ message: 'Extended user updated successfully', updatedExtendedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete an extended user
exports.deleteExtendedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExtendedUser = await ExtendedUser.findByIdAndDelete(id);
    if (!deletedExtendedUser) {
      return res.status(404).json({ error: 'Extended user not found.' });
    }
    res.status(204).json({ message: 'Extended user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};