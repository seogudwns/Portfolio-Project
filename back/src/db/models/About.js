import { AboutModel } from "../schemas/about";

class About {
    static async create({ AboutData }) {
        const createdNewAbout = await AboutModel.create(AboutData);
        return createdNewAbout;
    }

    static async findById({ about_id }) {
        const about = await AboutModel.findOne({ id: about_id });
        return about;
    }

    static async update() {
        return;
    }

    static async findByUserId() {
        return;
    }

    static async delete() {
        return;
    }
}

export { About };
