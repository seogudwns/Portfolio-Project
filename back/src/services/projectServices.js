import { Project } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class projectAuthService {
  static async addProject({
    user_id,
    title,
    description,
    from_date,
    to_date
  }) {

    const project = await Project.findByTitle({ title });

    if (project && project.user_id === user_id) {
      const errorMessage = "중복된 이름의 프로젝트입니다. 변경 바랍니다."
      return { errorMessage }
    }

    const id = uuidv4();
    const newdata = {
      user_id,
      title,
      description,
      from_date,
      to_date
    };
    //고유 아이디 생성 및 req로부터 받은 데이터 묶기

    const newProject = await Project.create({ newdata });
    newProject.errorMessage = null;
    // 프로젝트 등록

    return newProject;
  }


  // * 사용자와 동일한 user_id 정보를 가진 모든 프로젝트를 불러옴
  static async getProjectInfo({ user_id }) {
    const project = await Project.findByUserId({ user_id })

    if (!project) {
      const errorMessage = "프로젝트를 등록해주세요.";
      return { errorMessage };
    }

    return project;
  }


  //* 만기일을 합칠까 하다가 따로 뺌.
  //* 중복된 이름이 있으면 return err.. project_id는 업데이트 대상이 아니기 때문에 일부러 바깥으로 뺌.
  //* 자격증 업데이트... toUpdate = { title, description, from_date, to_date }
  static async setProject({ project_id, toUpdate }) {

    let project = await Project.findById({ project_id })

    // 요청받은 것과 중복된 이름의 자격증이 있는지 체크.
    const isTitle = toUpdate.title;
    const isExist = await Project.findByTitle({ isTitle });
    if (isExist && isExist.user_id === project.user_id) {
      const errorMessage = "중복된 이름의 프로젝트가 존재합니다.";
      return { errorMessage }
    } //! 나도 해깔리는 부분.. 같은 이름의 다른 유저가 작성한 자격증이 존재할 수 있으므로 겹으로 처리함.

    if (!project) {
      const errorMessage = "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
      return { errorMessage }
    } //나오면 안되는 메세지.

    // 차례대로 title, description, from_date, to_date 순으로 업뎃.
    if (toUpdate.title !== null) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description !== null) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date !== project.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date !== project.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    return project;
  }

  //! 예시에서 구현 안된거
  static async getProject(project_id) {
    const project = await Project.findById({ project_id })

    if (!project) {
      const errorMessage = "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
      return { errorMessage }
    }

    return project;
  }

}



export { projectAuthService };
