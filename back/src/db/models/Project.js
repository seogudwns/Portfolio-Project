import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ ProjectData }) {
        const createdNewProject = await ProjectModel.create(ProjectData);
        return createdNewProject;
    }

    static async findById({ project_id }) {
        const project = await ProjectModel.findOne({ id: project_id });
        return project;
    }

    static async findByTitle({ title, user_id }) {
        const projects = await ProjectModel.find({
            title,
            user_id,
        });

        return projects;
    }

    static async findByUserId({ user_id }) {
        const projects = await ProjectModel.find({ user_id });
        return projects;
    }

    static async update({ project_id, fieldToUpdate, newValue }) {
        const filteredById = { id: project_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedProject;
    }

    static async delete({ project_id }) {
        const deletedProject = await ProjectModel.deleteOne({ id: project_id });
        return deletedProject;
    }

    static async removeAllByUserId({ user_id }) {
        const deleteall = await ProjectModel.deleteMany({ user_id });
        return deleteall;
    } //* 유저가 아이디 삭제시 user_id를 포함한 모든 게시물 제거.
}

export { Project };
