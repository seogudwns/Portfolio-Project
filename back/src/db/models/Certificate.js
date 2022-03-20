// 서버 구동 issue로 인해 조금 늦게 시작했습니다.

import { CertificateModel } from "../schemas/certificate";

class Certificate {

    //*생성
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }
    //! 무엇이 필요할까? 다 만드는 것이 좋을지 고민된다...  자격증.. 기한, 갱신, 현재에 초점... 
    //! 만약 갱신이 안된 채로 자격증의 기한이 지나가면.. 빨간줄? 여튼 줄긋기 기능이 있어야 하지 않을까? 최소한 글자색이 흐려지게.

    //*고유 아이디를 가진 자격증을 불러옴.
    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({ certificate_id });

        return certificate;
    }

    //참조 링크 : 'https://masteringjs.io/tutorials/mongoose/find'
    //* 선언된 title을 가진 ((모든)) 자격증을 불러옴.
    static async findByTitle({ title, user_id }) {
        const certificates = await CertificateModel.find({ title, user_id });

        return certificates;
    }

    //* 선언된 user_id를 가진 ((모든)) 자격증을 불러옴.
    static async findByUserId({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });
        return certificates;
    }

    //* 고유 id를 통해 자격증 업데이트.
    static async update({ certificate_id, fieldToUpdate, newValue }) {
        const filter = { certificate_id };        //! 이게 왜 를 대체하는지 모르겠다....
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedCertificate;
    }

    static async removeById(certificate_id) {
        const deleteone = await CertificateModel.remove({ id: certificate_id });

        return deleteone;
    }

}

export { Certificate };
