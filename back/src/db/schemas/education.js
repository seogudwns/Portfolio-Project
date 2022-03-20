import { Schema, model } from "mongoose";

const educationSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const EducationModel = new model("Education", educationSchema);

export { EducationModel };
