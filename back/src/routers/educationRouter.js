import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";
import { addTokenBlackList } from "../middlewares/TokenBlackList";

const educationRouter = Router();
educationRouter.use(login_required);
educationRouter.use(addTokenBlackList);

educationRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }
        const { user_id, school, major, position, from_date, to_date } =
            req.body;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newEducation = await EducationService.createEducation({
            user_id,
            school,
            major,
            position,
            from_date,
            to_date,
        });

        res.status(201).json(newEducation);
    } catch (err) {
        next(err);
    }
});

educationRouter.get("/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEducationById({
            education_id,
        });

        if (education.errorMessage) {
            throw new Error(education.errorMessage);
        }

        res.status(200).json(education);
    } catch (err) {
        next(err);
    }
});

educationRouter.delete("/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEducationById({
            education_id,
        });

        if (education.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deletedEducation = await EducationService.deleteEducation({
            education_id,
        });

        if (deletedEducation.errorMessage) {
            throw new Error(deletedEducation.errorMessage);
        }

        res.status(200).json(deletedEducation);
    } catch (err) {
        next(err);
    }
});

educationRouter.put("/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEducationById({
            education_id,
        });

        if (education.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const school = req.body.school ?? null;
        const major = req.body.major ?? null;
        const position = req.body.position ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;
        const updateValue = { school, major, position, from_date, to_date };
        const updatedEducation = await EducationService.updateEducation({
            education_id,
            updateValue,
        });

        if (updatedEducation.errorMessage) {
            throw new Error(updatedEducation.errorMessage);
        }

        res.status(200).json(updatedEducation);
    } catch (err) {
        next(err);
    }
});

educationRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const educationList = await EducationService.getEduListByUserId({
            user_id,
        });

        res.status(200).json(educationList);
    } catch (err) {
        next(err);
    }
});

export { educationRouter };
