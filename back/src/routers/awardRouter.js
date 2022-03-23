import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

// 수상이력 생성
awardRouter.post("/awards", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }

        const newAward = await AwardService.createAward(req.body);

        res.status(201).json(newAward);
    } catch (err) {
        next(err);
    }
});

// 수상이력 조회(id)
awardRouter.get("/awards/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const award = await AwardService.getAwardById({ award_id });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).json(award);
    } catch (err) {
        next(err);
    }
});

// 수상이력 수정
awardRouter.put("/awards/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const when_date = req.body.when_date ?? null;
        const updateValue = { title, description, when_date };
        const updatedAward = await AwardService.updateAward({
            award_id,
            updateValue,
        });

        if (updatedAward.errorMessage) {
            throw new Error(updatedAward.errorMessage);
        }

        res.status(200).json(updatedAward);
    } catch (err) {
        next(err);
    }
});

// 수상이력 삭제
awardRouter.delete("/awards/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        console.log(award_id);
        const deletedAward = await AwardService.deleteAward({ award_id });

        if (deletedAward.errorMessage) {
            throw new Error(deletedAward.errorMessage);
        }

        res.status(200).json(deletedAward);
    } catch (err) {
        next(err);
    }
});

// 특정 유저의 수상이력 리스트 조회
awardRouter.get("/awardlist/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const awardList = await AwardService.getAwardListByUserId({ user_id });

        res.status(200).json(awardList);
    } catch (err) {
        next(err);
    }
});

export { awardRouter };
