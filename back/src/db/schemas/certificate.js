import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
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
        },
        expired_date: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const CertificateModel = model("certificate", certificateSchema);

export { CertificateModel };
