import mongoose, {Schema} from "mongoose";

const CitiesSchema = new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});

export default mongoose.model("cities", CitiesSchema);