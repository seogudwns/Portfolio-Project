import { UserModel } from "../db/schemas/user";
import { Education, Award, Project, Certificate, About, Other } from "../db";


const mvps = [Education, Award, Project, Certificate, About, Other];
class Checker {
    static async checkChild(user_id, Model) {
        return mvps.map(async Model => {
            await Model.find({ user_id });
        });
    }   //! 어디쓰면 좋을까? 추후 기능업데이트를 할 때 넣으면 좋긴 하겠지..?.. 쓰지는 않지만 잘 작동하고 만들어졌기에 남김.

    static async deleteChild({ user_id }) {
        mvps.map(async Model => {
            await Model.removeAllByUserId({ user_id });
        });
        return ;
    }  //* 각 mvp에 있는 user_id를 가진 모든 게시글을 삭제하는 기능.. 완성.
}

export { Checker };