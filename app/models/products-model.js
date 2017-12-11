import mongoose, {Schema} from "mongoose";

const ProductsSchema = new Schema({
    name: String,
    modelId: Number
});

export default mongoose.model("products", ProductsSchema);