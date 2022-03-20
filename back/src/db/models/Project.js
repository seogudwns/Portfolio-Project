import { ProjectModel } from "../schemas/project";

class Project {

    //*생성
    static async create({ newProject }) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }

    //*고유 아이디를 가진 project를 불러옴.
    static async findById({ project_id }) {
        const project = await ProjectModel.findOne({ project_id });
        return project;
    }

    //* 선언된 title을 가진 ((모든)) project를 불러옴.
    static async findByTitle({ title, user_id }) {
        const projects = await ProjectModel.find({ title, user_id });
        return projects;
    }

    //* 선언된 user_id를 가진 ((모든)) project를 불러옴.
    static async findByUserId({ user_id }) {
        const projects = await ProjectModel.find({ user_id });
        return projects;
    }

    //* 고유 id를 통해 자격증 업데이트.
    static async update({ project_id, fieldToUpdate, newValue }) {
        const filter = { project_id };  //! 역시나 이게 되는 이유를 파악할 필요가 있음.
        console.log(filter);
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        console.log(updatedProject);
        return updatedProject;
    }

    static async removeById(project_id) {
        const deleteone = await ProjectModel.remove({ id: project_id });

        return deleteone;
    }
}

export { Project };
