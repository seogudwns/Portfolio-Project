import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description ?? null;
        const result = req.body.result ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newProject = await projectService.createProject({
            user_id,
            title,
            description,
            result,
            from_date,
            to_date,
        });

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/:id", async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const project = await projectService.getProjectById({ project_id });

        if (project.errorMessage) {
            throw new Error(project.errorMessage);
        }

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const projectList = await projectService.getProjectByUserId({
            user_id,
        });
        if (projectList.errorMessage) {
            throw new Error(projectList.errorMessage);
        }

        res.status(200).json(projectList);
    } catch (error) {
        next(error);
    }
});

projectRouter.put("/:id", async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const project = await projectService.getProjectById({ project_id });

        if (project.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const result = req.body.result ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;

        const toUpdate = { title, description, result, from_date, to_date };
        const updatedProject = await projectService.updateProject({
            project_id,
            toUpdate,
        });

        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.delete("/:id", async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const project = await projectService.getProjectById({ project_id });

        if (project.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deletedProject = await projectService.deleteProject({
            project_id,
        });

        if (deletedProject.errorMessage) {
            throw new Error(deletedProject.errorMessage);
        }

        res.status(200).json(deletedProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
