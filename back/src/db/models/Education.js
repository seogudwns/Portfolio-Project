import { EducationModel } from "../schemas/education";

class Education {
    static async create({ educationData }) {
        const createdNewEdu = await EducationModel.create(educationData);
        return createdNewEdu;
    }

    static async findById({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    static async update({ education_id, fieldToUpdate, value }) {
        const filter = { id: education_id };
        const update = { [fieldToUpdate]: value };
        const option = { returnOriginal: false };
        const updateEdu = EducationModel.findOneAndUpdate(
            filter,
            update,
            option,
        );

        return updateEdu;
    }

    static async findByUserId({ user_id }) {
        const education = await EducationModel.find({ user_id });
        return education;
    }
}

export { Education };