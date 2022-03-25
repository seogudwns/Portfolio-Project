import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { otherService } from "../services/otherService";

const otherRouter = Router();
otherRouter.use(login_required);

otherRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const user_id = req.body.user_id;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newOther = await otherService.createOther({
            user_id,
            title,
            description,
            from_date,
            to_date,
        });

        if (newOther.errorMessage) {
            throw new Error(newOther.errorMessage);
        }

        res.status(201).json(newOther);
    } catch (error) {
        next(error);
    }
});

otherRouter.get("/:id", async (req, res, next) => {
    try {
        const other_id = req.params.id;
        const other = await otherService.getOtherById({ other_id });

        if (other.errorMessage) {
            throw new Error(other.errorMessage);
        }

        res.status(200).json(other);
    } catch (error) {
        next(error);
    }
});

otherRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const otherList = await otherService.getOtherListByUserId({
            user_id,
        });

        if (otherList.errorMessage) {
            throw new Error(otherList.errorMessage);
        }

        res.status(200).json(otherList);
    } catch (error) {
        next(error);
    }
});

otherRouter.put("/:id", async (req, res, next) => {
    try {
        const other_id = req.params.id;
        const other = await otherService.getOtherById({ other_id });

        if (other.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const user_id = req.currentUserId;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;

        const toUpdate = { title, description, from_date, to_date };
        const updatedOther = await otherService.updateOther({
            user_id,
            other_id,
            toUpdate,
        });
        //묶은 후 user_id를 통해 업데이트 진행, 업데이트 요소가 없을 시 기존 자료가 저장됨.

        if (updatedOther.errorMessage) {
            throw new Error(updatedOther.errorMessage);
        }

        res.status(200).json(updatedOther);
    } catch (error) {
        next(error);
    }
});

otherRouter.delete("/:id", async (req, res, next) => {
    try {
        const other_id = req.params.id;
        const other = await otherService.getOtherById({ other_id });

        if (other.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deletedOther = await otherService.deleteOther({ other_id });

        if (deletedOther.errorMessage) {
            throw new Error(deletedOther.errorMessage);
        }

        res.status(200).json(deletedOther);
    } catch (error) {
        next(error);
    }
});

export { otherRouter };
