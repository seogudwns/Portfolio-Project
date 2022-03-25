import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateService {
    static async createCertificate({
        user_id,
        title,
        description,
        expired_date,
    }) {
        const existCertificate = await Certificate.findByTitle({
            title,
            user_id,
        });

        if (existCertificate.length > 0) {
            const errorMessage =
                "중복된 이름의 자격증이 있습니다. 해당 자격증을 삭제 혹은 변경 바랍니다.";
            return { errorMessage };
        }

        const id = uuidv4();
        const CertificateData = {
            id,
            user_id,
            title,
            description,
            expired_date,
        };

        const newCertificate = await Certificate.create({
            CertificateData,
        });

        return newCertificate;
    }

    static async getCertificateListByUserId({ user_id }) {
        const certificate = await Certificate.findByUserId({ user_id });

        if (!certificate) {
            const errorMessage = "자격증을 등록해주세요.";
            return { errorMessage };
        }

        return certificate;
    }

    static async updateCertificate({ user_id, certificate_id, toUpdate }) {
        let certificate = await Certificate.findById({ certificate_id });
        let changecounter = 0;

        const isTitle = toUpdate.title;
        const isExist = await Certificate.findByTitle({
            title: isTitle,
            user_id,
        });

        if (isExist.length > 0) {
            let isExist_id = [];
            isExist.map((data) => isExist_id.push(data.id));

            if (
                isExist_id.length === 1 &&
                isExist_id.includes(certificate.id)
            ) {
                //* 수정할 대상만 유일하게 존재하기 때문에 넘김.
            } else {
                const errorMessage = "중복된 이름의 자격증이 존재합니다.";
                return { errorMessage };
            }
        } //* 자격증별로 이름 하나만 가지게 만들기 완료.

        if (!certificate) {
            const errorMessage =
                "잘못 등록된 자격증입니다. 관리자에게 문의해주세요.";
            return { errorMessage };
        }

        if (toUpdate.title !== certificate.title) {
            changecounter++;
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.description !== certificate.description) {
            changecounter++;
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.expired_date !== certificate.expired_date) {
            changecounter++;
            const fieldToUpdate = "expired_date";
            const newValue = toUpdate.expired_date;
            certificate = await Certificate.update({
                certificate_id,
                fieldToUpdate,
                newValue,
            });
        }

        if (changecounter === 0) {
            const errorMessage = "변경사항이 없습니다.";
            return { errorMessage };
        }

        return certificate;
    }

    static async set2Certificate({ certificate_id, newExpiredDate }) {
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

    static async getCertificateById({ certificate_id }) {
        const certificate = await Certificate.findById({ certificate_id });

        if (!certificate) {
            const errorMessage =
                "이 애러가 났다면 관리자가 글삭을 한 것일 가능성이 매우 높습니다.";
            return { errorMessage };
        }

        return certificate;
    }

    static async deleteCertificate({ certificate_id }) {
        const deletedCertificate = await Certificate.delete({ certificate_id });

        if (!deletedCertificate) {
            const errorMessage = "해당 자격증이 존재하지 않습니다.";
            return { errorMessage };
        }

        return deletedCertificate;
    }
}

export { certificateService };
