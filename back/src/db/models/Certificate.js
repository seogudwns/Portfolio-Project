// 서버 구동 issue로 인해 조금 늦게 시작했습니다.

import { CertificateModel } from "../schemas/certificate";

class Certificate {
    //*생성
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate);

        return createdNewCertificate;
    }
    //TODO : 만약 갱신이 안된 채로 자격증의 기한이 지나가면.. 빨간줄? 여튼 줄긋기 기능이 있어야 하지 않을까? 최소한 글자색이 흐려지게.

    //*고유 아이디를 가진 자격증을 불러옴. 
    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({ id: certificate_id });

        return certificate;
    }

    //참조 링크 : "https://masteringjs.io/tutorials/mongoose/find"
    //* 유저가 이미 만들었던 선언된 title을 가진 ((모든)) 자격증을 불러옴.... 생성과정중에 쓰이므로 주석처리 x
    static async findByTitle({ 
        title, 
        user_id,
    }) {
        const certificates = await CertificateModel.find({ 
            title, 
            user_id,
        });

        return certificates;
    }

    //* 선언된 user_id를 가진 ((모든)) 자격증을 불러옴.
    static async findByUserId({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });

        return certificates;
    }

    //* 고유 id를 통해 자격증 업데이트.
    static async update({ 
        certificate_id, 
        fieldToUpdate, 
        newValue,
    }) {
        const filter = { id: certificate_id };
        const update = { [fieldToUpdate]: newValue };  
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedCertificate;
    }

    static async removeById({ certificate_id }) {
        const deleteone = await CertificateModel.deleteOne({ id: certificate_id });

        return deleteone;
    }
}

export { Certificate };
