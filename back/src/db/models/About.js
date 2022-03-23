import { AboutModel } from "../schemas/about";

class About {
    static async create({ AboutData }) {
        const createdNewAbout = await AboutModel.create(AboutData);
        return createdNewAbout;
    }

    static async findById() {
        return;
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
