import { Schema, model } from "mongoose";

const OtherSchema = new Schema(
    {
        id: {
            type: String,
            required: true,  //model의 아이디.. 여기선 other_id
        },
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false, //* 제목이 없는 경우까지 있을 수 있기 때문에.
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
    }
);

const OtherModel = model("Other", OtherSchema);

export { OtherModel };
