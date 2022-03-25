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
}

export { Education };
