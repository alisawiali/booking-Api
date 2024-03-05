//
import Hotels from "../modals/Hotels.js";
import Room from "../modals/Room.js";
import { createErrro } from "../utils/error.js";

//   createRoom
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).send(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE Room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedRoom);
  } catch (error) {
    next(error);
  }
};
// DELETE ROOM
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).send("Successfully deleted the Room");
  } catch (error) {
    next(error);
  }
};

//  GET BY ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.rid);
    if (!room) return next(); // If no such room, move to the next
    res.status(200).send(room);
  } catch (error) {
    next(error);
  }
};

// GET All
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    next(error);
  }
};
