import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
// import { projectService } from "../services/projectService";
// import { otherService } from "../services/otherService";
// import { EducationService } from "../services/educationService";
// import { certificateService } from "../services/certificateService";
// import { AwardService } from "../services/awardService";
// import { AboutService } from "../services/aboutService";

const userAuthRouter = Router();

userAuthRouter.post("/users/register", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        // req (request) 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/users/login", async (req, res, next) => {
    try {
        // req (request) 에서 데이터 가져오기
        const email = req.body.email;
        const password = req.body.password;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/userlist", login_required, async (req, res, next) => {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userAuthService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/users/current", login_required, async (req, res, next) => {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.put("/users/:id", login_required, async (req, res, next) => {
    try {
        // URI로부터 사용자 id를 추출함.
        const user_id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;
        const image_url = req.body.image_url ?? null;

        const toUpdate = { name, email, password, description, image_url };

        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedUser = await userAuthService.setUser({
            user_id,
            toUpdate,
        });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/users/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get(
    "/userlist/:type/:pieceword",
    login_required,
    async (req, res, next) => {
        try {
            // 전체 사용자 목록을 얻음
            const type = req.params.type;
            const pieceword = req.params.pieceword;
            let resultList;

            if (type === "user_name") {
                resultList = await userAuthService.getUsersWithRestrict({
                    pieceword,
                }); //* 이름검색 완료
            } else if (type === "user_email") {
                resultList = await userAuthService.getUsersWithRestrict2({
                    pieceword,
                }); //* 이메일검색 완료
                // } else if (type === "project") {
                //     //! 여기부터는 잘 생각해야 함. 유저 내에서 정보를 찾는 것이 아님.., 유저가 가진 속성에서 있으면 유저를 추가하는 방식으로 가야하나?
                //     //! ex. Project : UserAuthService에서 각 user의 아이디를 뽑음, 각 아이디에 대해 filter를 이용해서 project모델에서 data의 title에
                //     //! pieceword가 있으면 남기고, 없으면 삭제.. await ** 2.... 런타임애러가 날거같은데....
                //     //! 일단 미완성인 상태로 구현을 해놓자.
                //     resultList = await projectService.getProjectWithRestrict({ pieceword });
                // } else if (type === "other") {
                //     resultList = await otherService.getOtherWithRestrict({ pieceword });
                // } else if (type === "eaducation") {
                //     resultList = await EducationService.getEducationWithRestrict({ pieceword });
                // } else if (type === "certificate") {
                //     resultList = await certificateService.getCertificateWithRestrict({ pieceword });
                // } else if (type === "award") {
                //     resultList = await AwardService.getAwardtWithRestrict({ pieceword });
                // } else if (type === "about") {
                //     resultList = await AboutService.getAboutWithRestrict({ pieceword });
            } else {
                const errorMessage = "검색하려는 정확한 타입을 골라주세요.";
                //! type에 다른 요소가 들어갈 경우 400 Bad Request가 뜨는데 임의로 string 전달.
                res.status(400).json(errorMessage);
            }

            res.status(200).json(resultList);
        } catch (error) {
            next(error);
        }
    },
);

userAuthRouter.delete("/users/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const deletdUser = await userAuthService.deleteUser({ user_id });

        if (deletdUser.errorMessage) {
            throw new Error(deletdUser.errorMessage);
        }

        res.status(200).json(deletdUser);
    } catch (err) {
        next(err);
    }
});

export { userAuthRouter };
