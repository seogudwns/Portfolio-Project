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

aboutRouter.put("/abouts/:id", async (req, res, next) => {
    try {
        const about_id = req.params.id;
        const blog = req.params.blog ?? null;
        const skill = req.params.skill ?? null;
        const position = req.params.position ?? null;
        const hobby = req.params.hobby ?? null;
        const updateValue = { blog, skill, position, hobby };
        const updatedAbout = await AboutService.updateAbout({
            about_id,
            updateValue,
        });

        if (updatedAbout.errorMessage) {
            throw new Error(updatedAbout.errorMessage);
        }

        res.status(200).json(updatedAbout);
    } catch (err) {
        next(err);
    }
});

aboutRouter.delete("/abouts/:id", async (req, res, next) => {
    try {
        const about_id = req.params.id;
        const deletedAbout = await AboutService.deleteAbout({ about_id });

        if (deletedAbout.errorMessage) {
            throw new Error(deletedAbout.errorMessage);
        }

        res.status(200).json(deletedAbout);
    } catch (err) {
        next(err);
    }
});

export { aboutRouter };
