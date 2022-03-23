import is from "@sindresorhus/is";
import { Router } from "express";
import { AboutService } from "../services/aboutService";
import { login_required } from "../middlewares/login_required";

const aboutRouter = Router();
aboutRouter.use(login_required);

/**"user_id": "af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "blog": "http://elice-project.test",
    "skill": ["javascript", "node.js", "express", "react"],
    "position": "웹 백엔드",
    "hobby": "에러 디버깅" */

aboutRouter.post("/abouts", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "Content-Type을 application/json으로 설정해주세요.",
            );
        }

        // const { user_id, blog, skill, position, hobby } = req.body;
        const newAbout = await AboutService.createAbout(req.body);
    } catch (err) {
        next(err);
    }
});
