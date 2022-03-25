import { userAuthRouter } from "./userRouter";
import { certificateRouter } from "./certificateRouter";
import { awardRouter } from "./awardRouter";
import { educationRouter } from "./educationRouter";
import { projectRouter } from "./projectRouter";
import { aboutRouter } from "./aboutRouter";
import { otherRouter } from "./otherRouter";

const indexRouter = (app) => {
    app.use("/users", userAuthRouter);
    app.use("/certificates", certificateRouter);
    app.use("/projects", projectRouter);
    app.use("/educations", educationRouter);
    app.use("/awards", awardRouter);
    app.use("/abouts", aboutRouter);
    app.use("/others", otherRouter);
};

export { indexRouter };
