import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

export default mongoose.model("User", userSchema);