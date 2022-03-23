import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    blog: {
        type: String,
        required: false,
        default: "",
    },
    skill: {
        type: [String],
        required: false,
        default: [],
    },
    position: {
        type: String,
        required: false,
        default: "",
    },
    hobby: {
        type: [String],
        required: false,
        default: [],
    },
});

const AboutModel = new model("About", AboutSchema);

export { AboutModel };
