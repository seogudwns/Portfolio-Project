import { EducationModel } from "../schemas/education";

class Education {
    static async create({ educationData }) {
        const createdNewEducation = await EducationModel.create(educationData);
        return createdNewEducation;
    }

    static async findById({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    static async update({ education_id, fieldToUpdate, value }) {
        const filteredById = { id: education_id };
        const updateData = { [fieldToUpdate]: value };
        const option = { returnOriginal: false }; // * 새롭게 업데이트 된 객체를 반환하는 옵션
        const updateEdu = EducationModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updateEdu;
    }

    static async findByUserId({ user_id }) {
        const education = await EducationModel.find({ user_id });
        return education;
    }

    static async delete({ education_id }) {
        const deletedEducation = await EducationModel.deleteOne({
            id: education_id,
        });

        return deletedEducation;
    }

    static async removeAllByUserId({ user_id }) {
        const deleteall = await EducationModel.deleteMany({ user_id });
        return deleteall;
    }  //* 유저가 아이디 삭제시 user_id를 포함한 모든 게시물 제거.
}

export { Education };
