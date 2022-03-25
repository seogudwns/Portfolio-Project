// import { Router } from "express";

import { userAuthRouter } from "./userRouter";
import { certificateRouter } from "./certificateRouter";
import { awardRouter } from "./awardRouter";
import { educationRouter } from "./educationRouter";
import { projectRouter } from "./projectRouter";
import { aboutRouter } from "./aboutRouter";
import { otherRouter } from "./otherRouter";

const router = (app) => {
    app.use(userAuthRouter);
    app.use(certificateRouter);
    app.use(projectRouter);
    app.use(educationRouter);
    app.use(awardRouter);
    app.use(aboutRouter);
    app.use(otherRouter);
};

export { router };
