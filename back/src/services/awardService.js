import { Award } from "../db/models/Award";
import { v4 as uuidv4 } from "uuid";

class AwardService {
    static async createAward({ user_id, title, description }) {
        const award_id = uuidv4();

        const awardData = { award_id, user_id, title, description };
        const newAward = await Award.create({awardData});
        return newAward;
    }

    static async getAwardById() {

    }

    static async updateAward() {

    }

    static async getAwardListByUserId() {

    }
}

export { AwardService };