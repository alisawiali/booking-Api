import Hotels from "../modals/Hotels.js";


// CAEATE POST HOTEL
export const createHotel = async (req, res, next) => {
  const hotel = new Hotels(req.body);
  try {
    const savedHotel = await hotel.save();
    return res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  } 
};

// UPDATE HOTEL
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
// DELETE HOTEL
export const deletedHotel = async (req, res) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully deleted the hotel.");
  } catch (error) {
    res.status(400).send("Error deleting the hotel.", error);
  }
};
//  GET BY ID HOTEL
export const getByIddHotel = async (req, res, next) => {
  try {
    const findHotels = await Hotels.findById(req.params.id);
    res.status(200).send(findHotels);
  } catch (error) {
    next(error);
  }
};

// GET All HOTEL
export const getdHotels = async (req, res, next) => {
  //  wird nach der Price von min -maximum sortiert
  const { min, max, ...others } = req.query;

  try {
    const findHotels = await Hotels.find({
      ...others,
      cheapstprice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);

    res.status(200).send(findHotels);
  } catch (error) {
    next(error);
  }
};

// GET countByCity
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );

    res.status(200).send(list);
  } catch (error) {
    next(error);
  }
};

// GET countByType
export const countByType = async (req, res, next) => {

  try {
    const types = ["hotel", "aprtment", "resort", "villa", "cobin"];
    const counts = await Promise.all(
      types.map(async (type) => {
        const count = await Hotels.countDocuments({ type });
        return { count, type };
      })
    );
    res.send(counts);
  } catch (error) {
    next(error);
  }
};


