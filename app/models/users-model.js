import mongoose, {Schema} from "mongoose";

const UsersSchema = new Schema({
    name: String,
    password: String,
    email: String
});

export default mongoose.model("users", UsersSchema);