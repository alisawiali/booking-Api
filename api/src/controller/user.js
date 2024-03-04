import User from "../modals/User.js";

// UPDATE
export const creatUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updateUser);
  } catch (error) {
    next(error);
  }
};
// DELETE
export const deletedUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully deleted the user.");
  } catch (error) {
    res.status(400).send("Error deleting the user.", error);
  }
};
//  GET BY ID
export const getByIddUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

// GET All
export const getdUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
