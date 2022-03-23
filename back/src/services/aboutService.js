import { About } from "../db";
import { v4 as uuidv4 } from "uuid";

class AboutService {
    static async createAbout({ user_id, blog, skill, position, hobby }) {
        const about_id = uuidv4();

        const AboutData = {
            id: about_id,
            user_id,
            blog,
            skill,
            position,
            hobby,
        };

        const newAbout = await About.create({ AboutData });
        return newAbout;
    }

    static async getAboutById({ about_id }) {
        const about = await About.findById({ about_id });

        if (!about) {
            const errorMessage = "일치하는 about_id가 없습니다.";
            return { errorMessage };
        }

        return about;
    }

    static async updateAbout({ about_id, updateValue }) {
        let about = await About.findById({ about_id });

        if (!about) {
            const errorMessage = "일치하는 about_id가 없습니다.";
            return { errorMessage };
        }

        if (updateValue.blog) {
            const fieldToUpdate = "blog";
            const value = updateValue.blog;
            about = await About.update({ about_id, fieldToUpdate, value });
        }

        if (updateValue.skill) {
            const fieldToUpdate = "skill";
            const value = updateValue.skill;
            about = await About.update({ about_id, fieldToUpdate, value });
        }

        if (updateValue.position) {
            const fieldToUpdate = "position";
            const value = updateValue.position;
            about = await About.update({ about_id, fieldToUpdate, value });
        }

        if (updateValue.hobby) {
            const fieldToUpdate = "hobby";
            const value = updateValue.hobby;
            about = await About.update({ about_id, fieldToUpdate, value });
        }

        return about;
    }

    static async deleteAbout({ about_id }) {
        const deletedAbout = await About.delete({ about_id });

        if (!deletedAbout) {
            const errorMessage = "일치하는 about_id가 없습니다.";
            return { errorMessage };
        }

        return deletedAbout;
    }

    static async getAboutListByUserId({ user_id }) {
        const aboutList = await About.findByUserId({ user_id });
        return aboutList;
    }
}

export { AboutService };
