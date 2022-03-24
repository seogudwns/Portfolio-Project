import { Other } from "../db";
import { v4 as uuidv4 } from "uuid";

class otherService {
    static async addOther({
        user_id,
        title,
        description,
        from_date,
        to_date,
    }) {
        const id = uuidv4();
        const newOther = {
            user_id,
            id,
            title,
            description,
            from_date,
            to_date,
        };
        //고유 아이디 생성 및 req로부터 받은 데이터 묶기

        const newother = await Other.create({ newOther });
        newother.errorMessage = null;
        // 프로젝트 등록
        
        return newother;
    }

    // * 사용자와 동일한 user_id 정보를 가진 모든 프로젝트를 불러옴
    static async getOtherInfo({ user_id }) {
        const other = await Other.findByUserId({ user_id });

        if (other.length === 0) {
            const errorMessage = "프로젝트를 등록해주세요.";
            return { errorMessage };
        }

        return other;
    }

    // 프로젝트 수정 관련.
    static async setOther({ user_id, other_id, toUpdate }) {
        let other = await Other.findById({ other_id });
        let changecounter = 0;

        if (!other) {
            const errorMessage = "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        } //나오면 안되는 메세지.

        if (other.user_id !== user_id) {
            const errorMessage = "수정권한이 없습니다.";
            return { errorMessage };
        } //다른 유저의 토큰으로 수정을 할 경우 애러메세지 출력.

        // 차례대로 title, description, from_date, to_date 순으로 업뎃.
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
        } //

        return other;
    }

    //! 예시에서 구현 안된거
    static async getOther({ other_id }) {
        const other = await Other.findById({ other_id });

        if (!other) {
            const errorMessage = "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return other;
    }

    static async deleteOther({ other_id }) {
        const deleteone = await Other.removeById({ other_id });

        if (!deleteone) {
            const errorMessage = '해당 프로젝트가 존재하지 않습니다.';
            return { errorMessage };
        }

        return deleteone;
    }
}

export { otherService };
