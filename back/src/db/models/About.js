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

    static async update({ about_id, fieldToUpdate, value }) {
        const filteredById = { id: about_id };
        const updateData = { [fieldToUpdate]: value };
        const option = { returnOriginal: false };

        const updatedAbout = await AboutModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedAbout;
    }

    static async findByUserId() {
        return;
    }

    static async delete() {
        return;
    }
}

export { About };
