import Hotels from "../modals/Hotels.js";
// CAEATE POST
export const createHotel = async (req, res, next) => {
  const hotel = new Hotels(req.body);
  try {
    const savedHotel = await hotel.save();
    return res.status(200).json(savedHotel);
    // if (!savedHotel) return res.status(400).send("Failed to create Hotel");
  } catch (error) {
    next(error);
  } 
};

// UPDATE
export const puteHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updateHotel);
  } catch (error) {
    next(error);
  }
};
// DELETE
export const deletedHotel = async (req, res) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully deleted the hotel.");
  } catch (error) {
    res.status(400).send("Error deleting the hotel.", error);
  }
};
//  GET BY ID
export const getByIddHotel = async (req, res, next) => {
  try {
    const findHotels = await Hotels.findById(req.params.id);
    res.status(200).send(findHotels);
  } catch (error) {
    next(error);
  }
};

// GET All
export const getdHotels = async (req, res, next) => {
  try {
    const findHotels = await Hotels.find();
    res.status(200).send(findHotels);
  } catch (error) {
    next(error);
  }
};
