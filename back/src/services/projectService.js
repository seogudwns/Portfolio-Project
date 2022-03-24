import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async addProject({
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
        const newProject = {
            user_id,
            id,
            title,
            description,
            result,
            from_date,
            to_date,
        };
        //고유 아이디 생성 및 req로부터 받은 데이터 묶기

        const newproject = await Project.create({ newProject });
        newproject.errorMessage = null;
        // 프로젝트 등록
        
        return newproject;
    }

    // * 사용자와 동일한 user_id 정보를 가진 모든 프로젝트를 불러옴
    static async getProjectInfo({ user_id }) {
        const projects = await Project.findByUserId({ user_id });
        
        if (projects.length === 0) {
            const errorMessage = "프로젝트를 등록해주세요.";
            return { errorMessage };
        }

        return projects;
    }

    // 프로젝트 업데이트.
    static async setProject({ 
        user_id, 
        project_id, 
        toUpdate, 
    }) {
        let project = await Project.findById({ project_id });
        let changecounter = 0;  //* 수정이 되는지 체크하는 counter.
        
        if (user_id !== project.user_id) {
            const errorMessage = "수정권한이 없는 게시글입니다.";
            return { errorMessage };  //! 다른 유저의 토큰을 가지고 글을 수정했을 때 수정이 가능하기에 추가.
        }

        if (!project) {
            const errorMessage =
                "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        } //나오면 안되는 메세지.

        // 차례대로 title, description, from_date, to_date 순으로 업뎃.
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

    //! 보기용
    static async getProject({ project_id }) {
        const project = await Project.findById({ project_id });

        if (!project) {
            const errorMessage =
                "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return project;
    }

    static async deleteProject({ project_id }) {
        const deleteone = await Project.removeById({ project_id });

        if (!deleteone) {
            const errorMessage = "해당 프로젝트가 존재하지 않습니다.";
            return { errorMessage };
        }

        return deleteone;
    }
}

export { projectService };
