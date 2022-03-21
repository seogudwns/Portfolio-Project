import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/certificateService";

// 자격증 라우터  asdasdasdasd
const certificateRouter = Router();

// !
// ?
// *
// TODO

//! 코딩과는 다르게 주석은 아래에서 위로 적어놓겠습니다.  -  HJ.

//! login_required는 현재 자기 토큰이 아니면 다른 메시지가 뜨게 설정되어있는듯.

//! 모든 것에 login_required를 넣는 것이 맞아보임.. 기관 인증은 어떻게??.... 더 생각해볼 것!

//? 중복확인은 어디로 들어가면 좋을까?.. 생성, 수정 둘 다 넣는 방법은?  날짜범위 지정은 어떻게 하면 좋을까?

// data =
//{"user_id":"870bd421-61bb-4b50-8c7d-88d216f33bcc","title":"qqe","description":"123","when_date":"2022-03-16", "id":123} -- id는 자동 생성

//************************************************************** 1. 자격증 생성. done
certificateRouter.post(
    "/certificate/create",
    login_required,
    async function (req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요",
                );
            }

            // req 에서 데이터 가져오기

            const user_id = req.body.user_id;
            const title = req.body.title;
            const description =
                req.body.description ?? "내용 및 설명을 추가해주세요.";
            const expired_date = req.body.expired_date; //* 내용 잘 뽑힘.

            //! addCertificate 만들기.. 여기서 중복 확인? .... 만약 들어간다면 수정에도 마찬가지로 들어가야함.. 요청시 확인할 것.
            // 위 데이터를 유저 db에 추가하기
            const newCertificate = await certificateAuthService.addCertificate({
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

//******************************************************** 4. user_id : user_id를 포함한 모든 자격증 가져오기.
certificateRouter.get(
    "/certificatelist/:user_id",
    login_required,
    async function (req, res, next) {
        try {
            // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
            const user_id = req.params.user_id;
            const currentCertificateInfo =
                await certificateAuthService.getCertificateInfo({
                    user_id,
                });

            if (currentCertificateInfo.errorMessage) {
                throw new Error(currentCertificateInfo.errorMessage);
            }

            res.status(200).send(currentCertificateInfo);
        } catch (error) {
            next(error);
        }
    },
);

//********************************************************************* 3. 수정기능, 양식이 조금 다르긴 한데 똑같은거를 넣지만 않으면 잘은 작동합니다.
//수정 기능.. //! 전체 변경기능은 한번 완성 후에는 항상 한번정도 경고창을 띄워서 많이 안쓰는 것이 좋다는 경고를 넣어주면 좋을 것 같습니다.
certificateRouter.put(
    "/certificates/:id",
    login_required,
    async function (req, res, next) {
        try {
            // req에서 데이터 가져오기
            const certificate_id = req.params.id;
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const expired_date = req.body.expired_date; //! Date가 어떻게 처리되는지 모르겠네..   type : object...

            const toUpdate = { title, description, expired_date };

            const updateCertificate =
                await certificateAuthService.setCertificate({
                    certificate_id,
                    toUpdate,
                });
            //묶은 후 user_id를 통해 업데이트 진행, 업데이트 요소가 없을 시 기존 자료가 저장.

            if (updateCertificate.errorMessage) {
                throw new Error(updateCertificate.errorMessage);
            }

            res.status(200).send(updateCertificate);
        } catch (error) {
            next(error);
        }
    },
);

//* 혹시 모르니 만들어놓았고, 1주차에는 없는 것이라 틀만 잡아놓았습니다. - 추후 업데이트 예정
//수정기능에서 버튼 하나 누르면 alert에서 확인 후 삭제하는 것으로 충분하지 않을까?
//자격증에 대한 정보를 잘못 작성하거나 했을 때 쓸 것! 상대적으로 엄청나게 낮은 중요도를 가지고 있고,
// certificateRouter.delete(
//   '/certificate/delete',
//   login_required,
//   async function (req, res, next) {
//     try {
//       const certificate_id = req.body.certificate_id;
//       const deleteCertificate = await certificateAuthService.deleteCertificate(certificate_id);

//       if (deleteCertificate.errorMessage) {
//         throw new Error(deleteCertificate.errorMessage);
//       }

//       res.status(200).send(deleteCertificate);
//     } catch (error) {
//       next(error);
//     }
// })

//! 이거는 지금은 쓸 필요 없음.
//날짜 갱신기능.. 갱신되는 날짜는 항상 기존의 날짜 뒤로.. //! 어떻게 써야 할 지 고민 필요!.. 현재는 같으면 애러가 출력되게 해놨음.
certificateRouter.put(
    "/certificate/date_update",
    login_required,
    async function (req, res, next) {
        try {
            const certificate_id = req.body.certificate_id;
            const newExpiredDate = req.body.expired_date;

            const updateCertificate =
                await certificateAuthService.set2Certificate({
                    certificate_id,
                    newExpiredDate,
                });

            if (updateCertificate.errorMessage) {
                throw new Error(updateCertificate.errorMessage);
            }

            res.status(200).send(updateCertificate);
        } catch (error) {
            next(error);
        }
    },
);

//! 현재 이게 있는 의미를 모르겠기에 login_required는 제외.. 뭐 추가는 어렵지 않으니.... 이건 잘 되네....ㅠㅠ,,,
certificateRouter.get("/certificates/:id", async function (req, res, next) {
    try {
        const certificate_id = req.params.id;

        const searchCertificate = await certificateAuthService.getCertificate(
            certificate_id,
        );

        if (searchCertificate.errorMessage) {
            throw new Error(searchCertificate.errorMessage);
        }

        res.status(200).send(searchCertificate);
    } catch (error) {
        next(error);
    }
});

//! 나중에 delete front로 사용하시면 뭘 뜨게 하면 좋을지 아이디어 주세요오~~~~ 구현만 해놓음
certificateRouter.delete(
    "/certificates/:id",
    login_required,
    async function (req, res, next) {
        try {
            const certificate_id = req.params.id;

            const deleteCertificate =
                await certificateAuthService.deleteCertificate(certificate_id);

            if (deleteCertificate.errorMessage) {
                throw new Error(deleteCertificate.errorMessage);
            }

            //? 여기 뭘로 redirect를 하면 좋을까??? --
            res.status(200).send(deleteCertificate);
        } catch (error) {
            next(error);
        }
    },
);

// //! id(_id랑 구분됨)를 통해 user의 정보를 찾는 기능
// userAuthRouter.get(
//   "/users/:id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       const user_id = req.params.id;
//       const currentUserInfo = await userAuthService.getUserInfo({ user_id });

//       if (currentUserInfo.errorMessage) {
//         throw new Error(currentUserInfo.errorMessage);
//       }

//       res.status(200).send(currentUserInfo);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export { certificateRouter };
