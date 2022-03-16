import { Router } from "express";
import login_required from "../middlewares/login_required";
import EducationService from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required)

educationRouter.post("/education/create", (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Erorr("Content-Type을 application/json으로 설정해주세요.");
        }
        
        const { user_id, school, major, position } = req.body;
        const newEdu = await EducationService.createEdu({ 
            user_id,
            school, 
            major, 
            position
        });

        res.status(201).json(newEdu);
    } catch (err) {
        next(err);
    }
})

// * education 상세정보 조회
educationRouter.get("/education/:id", (req, res, next) => {
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
})

educationRouter.put("/education/:id", (req, res, next) => {
    try {
        const education_id = req.params.id;
        const school = req.body.school ?? null;
        const major = req.body.major ?? null;
        const position = req.body.position ?? null;
        const updateValue = { school, major, position };
        const updatedEdu = await EducationService.updateEdu({ education_id, updateValue });

        if (updatedEdu.errorMessage) {
            throw new Error(updatedEdu.errorMessage);
        }

        res.status(200).json(updatedEdu);
    } catch (err) {
        next(err);
    }
})

educationRouter.get("/educationlist/:user_id", (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const educationList = await EducationService.getEduListByUserId({ user_id });

        res.status(200).json(educationList);
    } catch (err) {
        next(err);
    }
})

export { educationRouter };
