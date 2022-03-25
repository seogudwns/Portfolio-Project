import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { AboutService } from "../services/aboutService";

const aboutRouter = Router();
aboutRouter.use(login_required);

aboutRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }
        const { user_id, blog, skill, position, hobby } = req.body;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newAbout = await AboutService.createAbout({
            user_id,
            blog,
            skill,
            position,
            hobby,
        });

        res.status(201).json(newAbout);
    } catch (err) {
        next(err);
    }
});

aboutRouter.get("/:id", async (req, res, next) => {
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

aboutRouter.put("/:id", async (req, res, next) => {
    try {
        const about_id = req.params.id;
        const about = await AboutService.getAboutById({ about_id });
        if (about.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const blog = req.body.blog ?? null;
        const skill = req.body.skill ?? null;
        const position = req.body.position ?? null;
        const hobby = req.body.hobby ?? null;
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

aboutRouter.delete("/:id", async (req, res, next) => {
    try {
        const about_id = req.params.id;
        const about = await AboutService.getAboutById({ about_id });
        if (about.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deletedAbout = await AboutService.deleteAbout({ about_id });

        if (deletedAbout.errorMessage) {
            throw new Error(deletedAbout.errorMessage);
        }

        res.status(200).json(deletedAbout);
    } catch (err) {
        next(err);
    }
});

aboutRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const aboutList = await AboutService.getAboutListByUserId({ user_id });

        res.status(200).json(aboutList);
    } catch (err) {
        next(err);
    }
});

export { aboutRouter };
