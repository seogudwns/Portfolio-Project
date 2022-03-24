import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { otherService } from "../services/otherService";

const otherRouter = Router();

//******************************************************** 1. other모델 생성
otherRouter.post(
    "/others",
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    "headers의 Content-Type을 application/json으로 설정해주세요",
                );
            }

            // req 에서 데이터 가져오기
            const user_id = req.body.user_id;
            const title = req.body.title ?? null;  //! 기타 활동 모델이기 때문에 제목이 없을 가능성이 충분히 존재함. 제목이 없거나 삭제시 null로 처리.
            const description = req.body.description ?? null;
            const from_date = req.body.from_date ?? null;
            const to_date = req.body.to_date ?? null;
            //db에 추가
            const newOther = await otherService.addOther({
                user_id,
                title,
                description,
                from_date,
                to_date,
            });

            if (newOther.errorMessage) {
                throw new Error(newOther.errorMessage);
            }

            res.status(201).json(newOther);
        } catch (error) {
            next(error);
        }
    },
);

//************************ 4. user_id : user_id를 포함한 모든 other모델 가져오기.
otherRouter.get(
    "/otherlist/:user_id",
    login_required,
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const currentOtherInfo = await otherService.getOtherInfo({ user_id });

            if (currentOtherInfo.errorMessage) {
                throw new Error(currentOtherInfo.errorMessage);
            }

            res.status(200).send(currentOtherInfo);
        } catch (error) {
            next(error);
        }
    },
);

//********************************************************************* 3. 수정기능
otherRouter.put(
    "/others/:id",
    login_required,
    async (req, res, next) => {
        try {
            // req에서 데이터 가져오기
            const user_id = req.currentUserId;
            const other_id = req.params.id;
            const title = req.body.title ?? null; 
            //! 기타 활동 모델이기 때문에 제목이 없을 가능성이 충분히 존재함. 제목이 없거나 삭제시 null로 처리.
            const description = req.body.description ?? null; 
            const from_date = req.body.from_date ?? null;
            const to_date = req.body.to_date ?? null;

            const toUpdate = { title, description, from_date, to_date };

            const updateOther = await otherService.setOther({
                user_id,
                other_id,
                toUpdate,
            });
            //묶은 후 user_id를 통해 업데이트 진행, 업데이트 요소가 없을 시 기존 자료가 저장됨.

            if (updateOther.errorMessage) {
                throw new Error(updateOther.errorMessage);
            }

            res.status(200).send(updateOther);
        } catch (error) {
            next(error);
        }
    },
);

//! other_id를 가진 게시물 개별검색..... 첫 게시물만 검색이 된다??
otherRouter.get("/others/:id", async (req, res, next) => {
    try {
        const other_id = req.params.id;

        const searchOther = await otherService.getOther({ other_id });

        if (searchOther.errorMessage) {
            throw new Error(searchOther.errorMessage);
        }

        res.status(200).send(searchOther);
    } catch (error) {
        next(error);
    }
});

//! 나중에 delete front로 사용하시면 뭘 뜨게 하면 좋을지 아이디어 주세요오~~~~ 구현만 해놓음
otherRouter.delete(
    "/others/:id",
    login_required,
    async (req, res, next) => {
        try {
            const other_id = req.params.id;

            const deleteOther = await otherService.deleteOther({ other_id });

            if (deleteOther.errorMessage) {
                throw new Error(deleteOther.errorMessage);
            }

            res.status(200).send(deleteOther);
        } catch (error) {
            next(error);
        }
    },
);

export { otherRouter };
