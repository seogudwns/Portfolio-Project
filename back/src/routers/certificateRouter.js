import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const user_id = req.body.user_id;
        const title = req.body.title;
        const description = req.body.description ?? null;
        const expired_date = req.body.expired_date ?? null;

        if (user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const newCertificate = await certificateService.createCertificate({
            user_id,
            title,
            description,
            expired_date,
        });

        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage);
        }

        res.status(201).json(newCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get("/:id", async (req, res, next) => {
    try {
        const certificate_id = req.params.id;
        const certificate = await certificateService.getCertificateById({
            certificate_id,
        });

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage);
        }

        res.status(200).json(certificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get("/list/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const currentCertificateInfo =
            await certificateService.getCertificateListByUserId({ user_id });

        if (currentCertificateInfo.errorMessage) {
            throw new Error(currentCertificateInfo.errorMessage);
        }

        res.status(200).json(currentCertificateInfo);
    } catch (error) {
        next(error);
    }
});

certificateRouter.put("/:id", async (req, res, next) => {
    try {
        const certificate_id = req.params.id;
        const certificate = await certificateService.getCertificateById({
            certificate_id,
        });
        if (certificate.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const user_id = req.currentUserId;
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const expired_date = req.body.expired_date ?? null;
        const toUpdate = { title, description, expired_date };
        const updateCertificate = await certificateService.updateCertificate({
            user_id,
            certificate_id,
            toUpdate,
        });

        if (updateCertificate.errorMessage) {
            throw new Error(updateCertificate.errorMessage);
        }

        res.status(200).json(updateCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.delete("/:id", async (req, res, next) => {
    try {
        const certificate_id = req.params.id;
        const certificate = await certificateService.getCertificateById({
            certificate_id,
        });
        if (certificate.user_id !== req.currentUserId) {
            throw new Error("접근권한이 없는 유저입니다.");
        }

        const deleteCertificate = await certificateService.deleteCertificate({
            certificate_id,
        });

        if (deleteCertificate.errorMessage) {
            throw new Error(deleteCertificate.errorMessage);
        }

        res.status(200).json(deleteCertificate);
    } catch (error) {
        next(error);
    }
});

export { certificateRouter };
