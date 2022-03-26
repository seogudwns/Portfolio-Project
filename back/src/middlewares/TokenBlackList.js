import { Schema, model } from "mongoose";

const tokenList = new Schema({
    id: {
        type: Date,
        required: true,
        default: new Date,
    },
    Token: {
        type: String,
        required: true,
    },
});

const TokenModel = new model("token", tokenList);

//===========================================================
async function findByToken({ userToken }) {
    const award = await TokenModel.find({ Token: userToken });
    return award;
}

async function addBlockedToken({ userToken }) {
    const token = await TokenModel.create({ Token: userToken });
    return token;
}

async function deleteBlockedToken({ userToken }) {
    const token = await TokenModel.deleteOne({ token: userToken });
    return token;
}

// ==========================================================

const addTokenBlackList = async (req,res,next) => {
    try {
        // request 헤더로부터 authorization bearer 토큰을 받음.
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

        const existToken = await findByToken({ userToken });  

        if (existToken.length !== 0) {
            console.log("로그아웃 혹은 삭제한 아이디로부터 접촉한 토큰이 있습니다.");

            res.status(400).json("다시 로그인, 혹은 회원가입을 해주세요.");
            return;
        }

        next();
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
        return;
    }
};

export { TokenModel, addBlockedToken, addTokenBlackList, deleteBlockedToken };