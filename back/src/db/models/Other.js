import { OtherModel } from "../schemas/other";

class Other {
    static async create({ newOther }) {
        const createdNewOther = await OtherModel.create(newOther);
        return createdNewOther;
    }

    static async findById({ other_id }) {
        const other = await OtherModel.findOne({ id: other_id });
        return other;
    }

    static async findByTitle({ title, user_id }) {
        const others = await OtherModel.find({
            title,
            user_id,
        });

        return others;
    }

    static async findByUserId({ user_id }) {
        const others = await OtherModel.find({ user_id });
        return others;
    }

    static async update({ other_id, fieldToUpdate, newValue }) {
        const filteredById = { id: other_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedOther = await OtherModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedOther;
    }

    static async delete({ other_id }) {
        const deletedOther = await OtherModel.deleteOne({ id: other_id });
        return deletedOther;
    }
}

export { Other };
