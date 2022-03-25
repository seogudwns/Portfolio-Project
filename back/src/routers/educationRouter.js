import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/educations", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }

        const newEdu = await EducationService.createEdu(req.body);

        res.status(201).json(newEdu);
    } catch (err) {
        next(err);
    }
});

// * education 상세정보 조회
educationRouter.get("/educations/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEduById({ education_id });

        if (education.errorMessage) {
            throw new Error(education.errorMessage);
        }

        res.status(200).json(education);
    } catch (err) {
        next(err);
    }
});

// * education 정보 삭제
educationRouter.delete("/educations/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
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

educationRouter.put("/educations/:id", async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const school = req.body.school ?? null;
        const major = req.body.major ?? null;
        const position = req.body.position ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;
        const updateValue = { school, major, position, from_date, to_date };
        const updatedEdu = await EducationService.updateEdu({
            education_id,
            updateValue,
        });

        if (updatedEdu.errorMessage) {
            throw new Error(updatedEdu.errorMessage);
        }

        res.status(200).json(updatedEdu);
    } catch (err) {
        next(err);
    }
});

educationRouter.get("/educationlist/:user_id", async (req, res, next) => {
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
