import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
    { //! id : certificate_id, user_id : user_id 구분해놨습니다. User의 id에서 받아오는 것이 user_id, 그냥 id는 자격증별 고유 id 
        user_id: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,  //! 자격증의 경우 이름 그 자체가 설명의 전부인 경우가 있어서 false!
        },
        expired_date: {
            type: Date,
            required: true,    //! 구글링을 통해 일단 Date를 쓰긴 했는데 이상하다 싶으면 다른걸로 바꿀 것.
        },
    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("certificate", certificateSchema);

export { CertificateModel };
