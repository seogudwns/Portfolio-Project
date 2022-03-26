import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";
import { addTokenBlackList } from "../middlewares/TokenBlackList";

const awardRouter = Router();
awardRouter.use(login_required);
awardRouter.use(addTokenBlackList);

awardRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }

        const { user_id, title, description, when_date } = req.body;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newAward = await AwardService.createAward({
            user_id,
            title,
            description,
            when_date,
        });

        res.status(201).json(newAward);
    } catch (err) {
        next(err);
    }
});

awardRouter.get("/:id", async (req, res, next) => {
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

awardRouter.put("/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const award = await AwardService.getAwardById({ award_id });

        if (award.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

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

awardRouter.delete("/:id", async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const award = await AwardService.getAwardById({ award_id });
        if (award.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deletedAward = await AwardService.deleteAward({ award_id });

        if (deletedAward.errorMessage) {
            throw new Error(deletedAward.errorMessage);
        }

        res.status(200).json(deletedAward);
    } catch (err) {
        next(err);
    }
});

awardRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const awardList = await AwardService.getAwardListByUserId({ user_id });

        res.status(200).json(awardList);
    } catch (err) {
        next(err);
    }
});

export { awardRouter };
