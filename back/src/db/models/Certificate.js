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
}

export { Certificate };
