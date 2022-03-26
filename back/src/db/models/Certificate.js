import { CertificateModel } from "../schemas/certificate";

class Certificate {
    static async create({ CertificateData }) {
        const createdNewCertificate = await CertificateModel.create(
            CertificateData,
        );

        return createdNewCertificate;
    }

    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({
            id: certificate_id,
        });

        return certificate;
    }

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

    static async delete({ certificate_id }) {
        const deletedCertificate = await CertificateModel.deleteOne({
            id: certificate_id,
        });

        return deletedCertificate;
    }

    static async removeAllByUserId({ user_id }) {
        const deleteall = await CertificateModel.deleteMany({ user_id });
        return deleteall;
    } //* 유저가 아이디 삭제시 user_id를 포함한 모든 게시물 제거.
}

export { Certificate };
