import is from "@sindresorhus/is";
import { Router } from "express";
import { AboutService } from "../services/aboutService";
import { login_required } from "../middlewares/login_required";

const aboutRouter = Router();
aboutRouter.use(login_required);

aboutRouter.post("/abouts", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }

        // const { user_id, blog, skill, position, hobby } = req.body;
        const newAbout = await AboutService.createAbout(req.body);

        req.status(201).json(newAbout);
    } catch (err) {
        next(err);
    }
});

aboutRouter.get("/abouts/:id", async (req, res, next) => {
    try {
        const about_id = req.params.id;
        const about = await AboutService.getAboutById({ about_id });

        if (about.errorMessage) {
            throw new Error(about.errorMessage);
        }

        res.status(200).json(about);
    } catch (err) {
        next(err);
    }
});
