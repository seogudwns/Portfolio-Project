import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async createProject({
        user_id,
        title,
        description,
        result,
        from_date,
        to_date,
    }) {
        const existProject = await Project.findByTitle({
            title,
            user_id,
        });

        if (existProject.length > 0) {
            const errorMessage = "중복된 이름의 프로젝트입니다. 변경 바랍니다.";
            return { errorMessage };
        }

        const id = uuidv4();
        const ProjectData = {
            user_id,
            id,
            title,
            description,
            result,
            from_date,
            to_date,
        };

        const newProject = await Project.create({ ProjectData });

        return newProject;
    }

    static async getProjectByUserId({ user_id }) {
        const projectList = await Project.findByUserId({ user_id });
        return projectList;
    }

    // 프로젝트 업데이트.
    static async updateProject({ project_id, toUpdate }) {
        let project = await Project.findById({ project_id });
        let changecounter = 0;

        if (!project) {
            const errorMessage =
                "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        }

        if (toUpdate.title !== project.title) {
            changecounter++;
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.description !== project.description) {
            changecounter++;
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.result !== project.result) {
            changecounter++;
            const fieldToUpdate = "result";
            const newValue = toUpdate.result;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.from_date !== project.from_date) {
            changecounter++;
            const fieldToUpdate = "from_date";
            const newValue = toUpdate.from_date;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.to_date !== project.to_date) {
            changecounter++;
            const fieldToUpdate = "to_date";
            const newValue = toUpdate.to_date;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (changecounter === 0) {
            const errorMessage = "변경사항이 없습니다.";
            return { errorMessage };
        }

        return project;
    }

    static async getProjectById({ project_id }) {
        const project = await Project.findById({ project_id });

        if (!project) {
            const errorMessage =
                "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return project;
    }

    static async deleteProject({ project_id }) {
        const deletedProject = await Project.delete({ project_id });

        if (!deletedProject) {
            const errorMessage = "해당 프로젝트가 존재하지 않습니다.";
            return { errorMessage };
        }

        return deletedProject;
    }
}

export { projectService };
