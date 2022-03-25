import { CertificateModel } from "../schemas/certificate";

class Certificate {
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(
            newCertificate,
        );

        return createdNewCertificate;
    }

    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({
            id: certificate_id,
        });

        return certificate;
    }

    //참조 링크 : "https://masteringjs.io/tutorials/mongoose/find"
    //* 유저가 이미 만들었던 선언된 title을 가진 ((모든)) 자격증을 불러옴.... 생성과정중에 쓰이므로 주석처리 x
    static async findByTitle({ title, user_id }) {
        const certificates = await CertificateModel.find({
            title,
            user_id,
        });

        return certificates;
    }

    static async findByUserId({ user_id }) {
        const certificate = await CertificateModel.find({ user_id });
        return certificate;
    }

    //* 고유 id를 통해 자격증 업데이트.
    static async update({ certificate_id, fieldToUpdate, newValue }) {
        const filteredById = { id: certificate_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedCertificate;
    }

    static async removeById({ certificate_id }) {
        const deletedCertificate = await CertificateModel.deleteOne({
            id: certificate_id,
        });

        return deletedCertificate;
    }
}

export { Certificate };
