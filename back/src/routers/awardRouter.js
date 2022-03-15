import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

// 수상경력 생성
awardRouter.post("/awards/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Erorr("Content-Type을 application/json으로 설정해주세요.");
        }

        const { user_id, title, description } = req.body;
        const newAward = await AwardService.createAward({ user_id, title, description });
        res.status(201).json(newAward);

    } catch (err) {
        next(err);
    }
})

// 수상경력 조회(id)
awardRouter.get("/awards/:id", async (req, res, next) => {

})

// 수상경력 수정
awardRouter.put("/awards/:id", async (req, res, next) => {

})

// 특정 유저의 수상경력 리스트 조회
awardRouter.get("/awardlist/:user_id", async (req, res, next) => {

})