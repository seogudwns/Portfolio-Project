import { Award } from "../db/models/Award";
import { v4 as uuidv4 } from "uuid";

class AwardService {
    static async createAward({ user_id, title, description }) {
        const award_id = uuidv4();

        const awardData = { award_id, user_id, title, description };
        const newAward = await Award.create({awardData});
        return newAward;
    }

    static async getAwardById({ award_id }) {
        const award = await Award.findById({award_id});

        // award_id에 해당하는 정보가 없을 때
        if (!award) {
            const errorMessage = "일치하는 award_id가 없습니다."
            return { errorMessage };
        }
        return award;
    }

    static async updateAward() {

    }

    static async getAwardListByUserId() {

    }
}

export { AwardService };