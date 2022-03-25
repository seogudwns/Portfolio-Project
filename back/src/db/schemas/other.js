import { Schema, model } from "mongoose";

const OtherSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
            default: "",
        },
        from_date: {
            type: String,
            required: false,
        },
        to_date: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const OtherModel = model("Other", OtherSchema);

export { OtherModel };
