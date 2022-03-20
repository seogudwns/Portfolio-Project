import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
    //* 자격증 생성.
    static async addCertificate({ user_id, title, description, expired_date }) {
        const existCertificate = await Certificate.findByTitle({
            title,
            user_id,
        }); //! typeof certificate === object
        //! object의 길이를 통해 해결, 검색은 유저의 아이디와 제목이 둘 다 같은 경우 되게 함.
        if (existCertificate.length > 0) {
            const errorMessage = "중복된 이름의 자격증입니다. 변경 바랍니다.";
            return { errorMessage };
        } //TODO : 아래껄로 바꾸고 싶다..

        // if (certificate.title===title) {
        //   if (certificate.expired_date===expired_date) {
        //     const errorMessage = "동일한 자격증이 존재합니다. 날짜를 갱신해주세요."
        //     return {errorMessage}
        //   }
        // }   expired_date에 대한 해결방법(날짜가 겹치는 경우, 날짜가 겹치지 않는 경우) 고민해봐야 함...
        //(동일한 이름의 날짜가 겹치는 케이스의 경우 위의 메시지, 동일한 이름이지만 날짜가 겹치지 않는 경우 생성 가능하게 만들어야 함..)

        const id = uuidv4();
        const newCertificate = {
            user_id,
            id,
            title,
            description,
            expired_date,
        };
        //고유 아이디 생성 및 req로부터 받은 데이터 묶기

        const createNewCertificate = await Certificate.create({
            newCertificate,
        });

        //! 'js 파일끼리 연동이 될 때는 항상 변수명까지 똑같이 만들어야 전달이 된다... 왜????'

        createNewCertificate.errorMessage = null;
        // 자격증 등록

        return createNewCertificate;
    }

    // * 사용자와 동일한 user_id 정보를 가진 모든 자격증을 불러옴
    static async getCertificateInfo({ user_id }) {
        const certificate = await Certificate.findByUserId({ user_id });

        if (!certificate) {
            const errorMessage = "자격증을 등록해주세요.";
            return { errorMessage };
        }

        return certificate;
    }

    //* 만기일을 합칠까 하다가 따로 뺌.
    //* 중복된 이름이 있으면 return err.. certificate_id는 업데이트 대상이 아니기 때문에 일부러 바깥으로 뺌.
    //* 자격증 업데이트... toUpdate = { certificate_id, title, description, expired_date }
    static async setCertificate({ certificate_id, toUpdate }) {
        let certificate = await Certificate.findById({ certificate_id });
        //! '내가 뭔가 잘못 생각하고 있는 중인가??.. 여기 뜯어볼 것..!.. 작동은 하는데 명백히 이상함.

        const isTitle = toUpdate.title;
        const user_id = certificate.user_id;
        const isExist = await Certificate.findByTitle({
            title: isTitle,
            user_id,
        });
        if (isExist.length > 0) {
            const errorMessage = "중복된 이름의 자격증이 존재합니다.";
            return { errorMessage };
        } //! 나도 해깔리기에... 같은 이름의 다른 유저가 작성한 자격증이 존재할 수 있으므로 겹으로 처리함.

        if (!certificate) {
            const errorMessage =
                "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        } //나오면 안되는 메세지.

        // 차례대로 title, description, expired_date 순으로 업뎃.
        if (toUpdate.title !== null) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.description !== null) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.expired_date !== certificate.expired_date) {
            const fieldToUpdate = "expired_date";
            const newValue = toUpdate.expired_date;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        return certificate;
    }

    //* 자격증 만기일 갱신
    static async set2Certificate(certificate_id, newExpiredDate) {
        let certificate = await Certificate.findById({ certificate_id });

        if (certificate.expired_date === newExpiredDate) {
            const errorMessage = "만기일자를 변경하지 않았습니다.";
            return { errorMessage };
        } //TODO : 생성과 비슷하게 expired_date가 certificate.expired_date보다 빠르거나 같으면 좋을텐데..

        const fieldToUpdate = "expired_date";
        certificate = await Certificate.update({
            certificate_id,
            fieldToUpdate,
            newExpiredDate,
        });

        return certificate;
    }

    //! 예시에서 구현 안된거
    static async getCertificate(certificate_id) {
        const certificate = await Certificate.findById({ certificate_id });

        if (!certificate) {
            const errorMessage =
                "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return certificate;
    }

    static async deleteCertificate(certificate_id) {
        const deleteone = await Certificate.removeById(certificate_id);

        if (!deleteone) {
            const errorMessage = "해당 자격증이 존재하지 않습니다.";
            return { errorMessage };
        }

        return deleteone;
    }
}

export { certificateAuthService };
