import { OtherModel } from "../schemas/other";

class Other {
    static async create({ otherData }) {
        const createdNewOther = await OtherModel.create(otherData);
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

    static async removeAllByUserId({ user_id }) {
        const deleteall = await OtherModel.deleteMany({ user_id });
        return deleteall;
    } //* 유저가 아이디 삭제시 user_id를 포함한 모든 게시물 제거.
}

export { Other };
