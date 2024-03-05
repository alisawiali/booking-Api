import mongoose from "mongoose";
const { Schema } = mongoose;
const Hotelsschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    addres: {
      type: String,
      required: false,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    //
    // Bewertung
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    //   günstigster Preis
    cheapstprice: {
      type: Number,
      required: true,
    },
    //   vorgestellt  =>  متميز
    featured: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: false }
);

// Hier verwenden wir mongoose.model(), um das Model zu erstellen und zu exportieren
export default mongoose.model("Hotels", Hotelsschema);
