import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
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
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: "",
        },
        result: {
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
    }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
