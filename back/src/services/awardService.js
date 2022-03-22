import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class AwardService {
    static async createAward({ user_id, title, description, when_date }) {
        const award_id = uuidv4();

        const awardData = {
            id: award_id,
            user_id,
            title,
            description,
            when_date,
        };
        const newAward = await Award.create({ awardData });
        return newAward;
    }

    static async getAwardById({ award_id }) {
        const award = await Award.findById({ award_id });

        // award_id에 해당하는 정보가 없을 때
        if (!award) {
            const errorMessage = "일치하는 award_id가 없습니다.";
            return { errorMessage };
        }

        return award;
    }

    static async updateAward({ award_id, updateValue }) {
        // award_id와 일치하는 award를 찾기
        let award = await Award.findById({ award_id });

        if (!award) {
            const errorMessage = "일치하는 award_id가 없습니다.";
            return { errorMessage };
        }

        // 해당 award를 받은 정보로 업데이트
        if (updateValue.title) {
            const fieldToUpdate = "title";
            const value = updateValue.title;
            award = await Award.update({ award_id, fieldToUpdate, value });
        }

        if (updateValue.description) {
            const fieldToUpdate = "description";
            const value = updateValue.description;
            award = await Award.update({ award_id, fieldToUpdate, value });
        }

        if (updateValue.when_date) {
            const fieldToUpdate = "when_date";
            const value = updateValue.when_date;
            award = await Award.update({ award_id, fieldToUpdate, value });
        }

        return award;
    }

    static async getAwardListByUserId({ user_id }) {
        const awardList = await Award.findByUserId({ user_id });
        return awardList;
    }

    static async deleteAward({ award_id }) {
        const deletedAward = await Award.delete({ award_id });

        if (!deletedAward) {
            const errorMessage = "일치하는 award_id가 없습니다.";
            return { errorMessage };
        }

        return deletedAward;
    }
}

export { AwardService };
