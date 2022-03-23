import { About } from "../db/models/About";
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
}

export { AboutService };
