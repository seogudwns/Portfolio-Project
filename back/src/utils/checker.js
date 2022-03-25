import { UserModel } from "../db/schemas/user";
import { Education, Award, Project, Certificate, About, Other } from "../db";


const mvps = [Education, Award, Project, Certificate, About, Other];
class Checker {
    static async checkChild(user_id, Model) {
        return await Model.find({user_id});
    }   //! 

    static async deleteChild({ user_id }) {
        console.log(mvps);
        mvps.map(async Model => {
            await Model.removeAllByUserId({ user_id });
        });
        return ;
    }  //* 각 mvp에 있는 user_id를 가진 모든 게시글을 삭제하는 기능.  done.
    //* 완성.

    static async PickUsers({Model, pieceword}) {  //* userModel에서 userList를 뽑아 users에 담음, Model은 const로 체크할 모델 지정, pieceword는 단어.
        const users = await UserModel.find({});
        const checkUserList = [];
        users.filter(async user => {
            await Model.findByUserId({ user_id: user.id })
                .then(et => console.log(et));
        });
        console.log("Is Model in mvps? : ", mvps.includes(Model)); //! 여기서 작동오류가 나타남.. 어떻게 하면 될까?
        console.log("pieceword : ", pieceword);
        console.log("Model : ", Model);
        console.log(checkUserList);

        return checkUserList;
    }
}
//! 1,2번은 구현 완료, 잘 작동됨. 3번은 꼬임..... 구현 안되겠네..ㅠ

export { Checker };