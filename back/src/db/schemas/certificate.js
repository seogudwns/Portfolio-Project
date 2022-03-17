import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,    //! id와 user_id 를 구분해서 쓴 이유를 잘 생각해볼 것!... 
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    when_date: {
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
