import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectAuthService } from "../services/projectService";

const projectRouter = Router();

//******************************************************** 1. project 생성
projectRouter.post(
    "/project/create",
    login_required,
    async function (req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요",
                );
            }

            // req 에서 데이터 가져오기
            const user_id = req.body.user_id; //! 아무리 생각해도 여기서 받으면 안되는 것 같음.
            const title = req.body.title;
            const description = req.body.description ?? null;
            const from_date = req.body.from_date ?? Date(); //! ?? null 이 작동을 안하네,,,, Date는 Date 함수로 써줘야함.
            const to_date = req.body.to_date ?? Date();

            //db에 추가
            const newProject = await projectAuthService.addProject({
                user_id,
                title,
                description,
                from_date,
                to_date,
            });

            if (newProject.errorMessage) {
                throw new Error(newProject.errorMessage);
            }

            res.status(201).json(newProject);
        } catch (error) {
            next(error);
        }
    },
);

//******************************************************** 4. user_id : user_id를 포함한 모든 project 가져오기. ~
projectRouter.get(
    "/projectlist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
            const user_id = req.params.user_id;
            const currentProjectInfo = await projectAuthService.getProjectInfo({
                user_id,
            });

            if (currentProjectInfo.errorMessage) {
                throw new Error(currentProjectInfo.errorMessage);
            }

            res.status(200).send(currentProjectInfo);
        } catch (error) {
            next(error);
        }
    },
);

//********************************************************************* 3. 수정기능
projectRouter.put(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            // req에서 데이터 가져오기
            const project_id = req.params.id;
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const from_date = req.body.from_date;
            const to_date = req.body.to_date;

            const toUpdate = { title, description, from_date, to_date };

            const updateProject = await projectAuthService.setProject({
                project_id,
                toUpdate,
            });
            //묶은 후 user_id를 통해 업데이트 진행, 업데이트 요소가 없을 시 기존 자료가 저장됨.

            if (updateProject.errorMessage) {
                throw new Error(updateProject.errorMessage);
            }

            res.status(200).send(updateProject);
        } catch (error) {
            next(error);
        }
    },
);

//! 자격증과 마찬가지로 현재 이게 있는 의미를 모르겠기에 login_required는 제외
projectRouter.get("/projects/:id", async function (req, res, next) {
    try {
        const project_id = req.params.id;

        const searchProject = await projectAuthService.getProject(project_id);

        if (searchProject.errorMessage) {
            // throw new Error(searchProject.errorMessage);
        }

        res.status(200).send(searchProject);
    } catch (error) {
        next(error);
    }
});

//! 나중에 delete front로 사용하시면 뭘 뜨게 하면 좋을지 아이디어 주세요오~~~~ 구현만 해놓음
projectRouter.delete(
    "/projects/:id",
    login_required,
    async function (req, res, next) {
        try {
            const project_id = req.params.id;

            const deleteProject = await projectAuthService.deleteProject(
                project_id,
            );

            if (deleteProject.errorMessage) {
                throw new Error(deleteProject.errorMessage);
            }

            res.status(200).send(deleteProject);
        } catch (error) {
            next(error);
        }
    },
);

export { projectRouter };
