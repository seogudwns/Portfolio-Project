import { Other } from "../db";
import { v4 as uuidv4 } from "uuid";

class otherService {
    static async createOther({
        user_id,
        title,
        description,
        from_date,
        to_date,
    }) {
        const id = uuidv4();
        const otherData = {
            user_id,
            id,
            title,
            description,
            from_date,
            to_date,
        };

        const newOther = await Other.create({ otherData });

        return newOther;
    }

    static async getOtherListByUserId({ user_id }) {
        const other = await Other.findByUserId({ user_id });
        return other;
    }

    static async updateOther({ user_id, other_id, toUpdate }) {
        let other = await Other.findById({ other_id });
        let changecounter = 0;

        if (!other) {
            const errorMessage =
                "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        }

        if (toUpdate.title !== other.title) {
            changecounter++;
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            other = await Other.update({
                other_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.description !== other.description) {
            changecounter++;
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            other = await Other.update({
                other_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.from_date !== other.from_date) {
            changecounter++;
            const fieldToUpdate = "from_date";
            const newValue = toUpdate.from_date;
            other = await Other.update({
                other_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.to_date !== other.to_date) {
            changecounter++;
            const fieldToUpdate = "to_date";
            const newValue = toUpdate.to_date;
            other = await Other.update({
                other_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (changecounter === 0) {
            const errorMessage = "변경사항이 없습니다.";
            return { errorMessage };
        }

        return other;
    }

    static async getOtherById({ other_id }) {
        const other = await Other.findById({ other_id });

        if (!other) {
            const errorMessage =
                "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return other;
    }

    static async deleteOther({ other_id }) {
        const deletedOther = await Other.delete({ other_id });

        if (!deletedOther) {
            const errorMessage = "해당 프로젝트가 존재하지 않습니다.";
            return { errorMessage };
        }

        return deletedOther;
    }
}

export { otherService };
