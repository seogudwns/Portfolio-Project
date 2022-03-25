import { AwardModel } from "../schemas/award";

class Award {
    static async create({ awardData }) {
        const createdNewAward = await AwardModel.create(awardData);
        return createdNewAward;
    }

    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }

    static async update({ award_id, fieldToUpdate, value }) {
        const filteredById = { id: award_id };
        const updateData = { [fieldToUpdate]: value };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedAward;
    }

    static async findByUserId({ user_id }) {
        const award = await AwardModel.find({ user_id });
        return award;
    }

    static async delete({ award_id }) {
        const deletedAward = await AwardModel.deleteOne({ id: award_id });
        return deletedAward;
    }

    static async removeAllByUserId({ user_id }) {
        const deleteall = await AwardModel.deleteMany({ user_id });
        return deleteall;
    }  //* 유저가 아이디 삭제시 user_id를 포함한 모든 게시물 제거.
}

export { Award };
