import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

// 자격증 라우터
const certificateRouter = Router();
certificateRouter.use(login_required);

// !
// ?
// *
// TODO

//! 모든 것에 login_required를 넣는 것이 맞아보임.. 기관 인증은 어떻게??.... 더 생각해볼 것!

//************************************************************** 1. 자격증 생성. done
certificateRouter.post("/", async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요",
                );
            }

            const user_id = req.body.user_id;
            const title = req.body.title;
            const description =
                req.body.description ?? "내용 및 설명을 추가해주세요.";
            const expired_date = req.body.expired_date ?? null;

            // 위 데이터를 유저 db에 추가하기
            const newCertificate = await certificateService.addCertificate({
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
    },
);

//********************************** 4. user_id : user_id를 포함한 모든 자격증 가져오기.
certificateRouter.get("/list/:user_id", async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const currentCertificateInfo =
                await certificateService.getCertificateInfo({ user_id });

            if (currentCertificateInfo.errorMessage) {
                throw new Error(currentCertificateInfo.errorMessage);
            }

            res.status(200).json(currentCertificateInfo);
        } catch (error) {
            next(error);
        }
    },
);

//********************************************************************* 3. 수정기능.
//! 수정기능은 한번 완성 후에는 항상 한번정도 경고창을 띄워서 많이 안쓰는 것이 좋다는 경고를 넣어주면 좋을 것 같습니다.
certificateRouter.put("/:id", async (req, res, next) => {
        try {
            // req에서 데이터 가져오기
            const user_id = req.currentUserId;
            const certificate_id = req.params.id;
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const expired_date = req.body.expired_date ?? null;

            const toUpdate = { title, description, expired_date };

            const updateCertificate =
                await certificateService.setCertificate({
                    user_id,
                    certificate_id,
                    toUpdate,
                });
            //묶은 후 certificate_id를 통해 업데이트 진행, 업데이트 요소가 없을 시 경고메시지.

            if (updateCertificate.errorMessage) {
                throw new Error(updateCertificate.errorMessage);
            }

            res.status(200).json(updateCertificate);
        } catch (error) {
            next(error);
        }
    },
);

//*************************************************************** delete 기능.
certificateRouter.delete("/:id", async (req, res, next) => {
        try {
            const certificate_id = req.params.id;

            const deleteCertificate =
                await certificateService.deleteCertificate({
                    certificate_id,
                });

            if (deleteCertificate.errorMessage) {
                throw new Error(deleteCertificate.errorMessage);
            }

            res.status(200).json(deleteCertificate);
        } catch (error) {
            next(error);
        }
    },
);

//! 2. 이게 있는 의미... 개별 아이디의 속성을 보기 위함.
certificateRouter.get("/:id", async (req, res, next) => {
    try {
        const certificate_id = req.params.id;

        const searchCertificate = await certificateService.getCertificate({
            certificate_id,
        });

        if (searchCertificate.errorMessage) {
            throw new Error(searchCertificate.errorMessage);
        }

        res.status(200).json(searchCertificate);
    } catch (error) {
        next(error);
    }
});

export { certificateRouter };
