import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
    static async createEdu({ user_id, school, major, position }) {
        const education_id = uuidv4();
        const educationData = {
            id: education_id,
            user_id,
            school,
            major,
            position,
        };
        const newEducation = await Education.create({ educationData });

        return newEducation;
    }

    static async getEduById({ education_id }) {
        const education = await Education.findById({ education_id });

        if (!education) {
            const errorMessage = "일치하는 education_id가 없습니다.";
            return { errorMessage };
        }

        return education;
    }

    static async updateEdu({ education_id, updateValue }) {
        let education = await Education.findById({ education_id });

        if (!education) {
            const errorMessage = "일치하는 award_id가 없습니다.";
            return { errorMessage };
        }

        if (updateValue.school) {
            const fieldToUpdate = "school";
            const value = updateValue.school;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                value,
            });
        }

        if (updateValue.major) {
            const fieldToUpdate = "major";
            const value = updateValue.major;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                value,
            });
        }

        if (updateValue.position) {
            const fieldToUpdate = "position";
            const value = updateValue.position;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                value,
            });
        }

        return education;
    }

    static async getEduListByUserId({ user_id }) {
        const educationList = await Education.findByUserId({ user_id });
        return educationList;
    }

    static async deleteEducation({ education_id }) {
        const deletedEducation = await Education.delete({ education_id });

        if (!deletedEducation) {
            const errorMessage = "일치하는 education_id가 없습니다.";
            return { errorMessage };
        }

        return { deletedEducation };
    }
}

export { EducationService };
