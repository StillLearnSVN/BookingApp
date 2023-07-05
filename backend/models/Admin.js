import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    addedMovies: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Movie",
        },
      ],
});

export default mongoose.model("Admin", adminSchema);