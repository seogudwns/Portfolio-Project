import { AwardModel } from '../schemas/award';

class Award {
    static async create({ awardData }) {
        const createdNewAward = await AwardModel.create(awardData);
        return createdNewAward;
    }

    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }

    /*
     * fieldToUpdate: 업데이트할 필드 이름
     * toUpdate: 업데이트 대상 값(title, description)
     */
    static async update({ award_id, fieldToUpdate, value }) {
        const filter = { id: award_id };
        const update = { [fieldToUpdate]: value };
        const option = { returnOriginal: false };
        const updatedUser = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option,
        );

        return updatedUser;
    }

    static async findByUserId({ user_id }) {
        const award = await AwardModel.find({ user_id });
        return award;
    }

    static async delete({ award_id }) {
        const deletedAward = await AwardModel.deleteOne({ id: award_id });
        return deletedAward;
    }
}

export { Award };
