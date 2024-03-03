import mongoose from "mongoose";
const { Schema } = mongoose;
const userSschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

// Hier verwenden wir mongoose.model(), um das Model zu erstellen und zu exportieren
export default mongoose.model("User", userSschema);
