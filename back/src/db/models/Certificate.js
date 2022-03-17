// 서버 구동 issue로 인해 조금 늦게 시작했습니다.

import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  //! 무엇이 필요할까? 다 만드는 것이 좋을지 고민된다...  자격증.. 기한, 갱신, 현재에 초점... 
  //! 만약 갱신이 안된 채로 자격증의 기한이 지나가면.. 빨간줄? 여튼 줄긋기 기능이 있어야 하지 않을까? 최소한 글자색이 흐려지게.

  static async findById({ user_id }) {
    const certificate = await CertificateModel.findOne({ id: user_id });  //* 일단 이거는 필요.. 글을 올려야하니까.
    return certificate;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
