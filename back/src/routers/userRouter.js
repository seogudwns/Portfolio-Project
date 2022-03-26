import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

userAuthRouter.post("/register", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

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

userAuthRouter.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/list", login_required, async (req, res, next) => {
    
    try {
        const users = await userAuthService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get("/current", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).json(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.put("/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;
        const image_url = req.body.image_url ?? null;

        if (req.currentUserId !== user_id) {
            throw new Error("접근권한이 없습니다.");
        }

        const toUpdate = { name, email, password, description, image_url };
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

userAuthRouter.get("/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).json(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.get(
    "/list/:type/:pieceword",
    login_required,
    async (req, res, next) => {
        try {
            const Model = req.params.type;
            const pieceword = req.params.pieceword;

            let resultList;
            const modelName = ["Other", "Eaducation", "Certificate", "Award", "Project", "About"];
            if (Model === "user_name") {
                resultList = await userAuthService.getUsersWithRestrict({
                    pieceword,
                }); //* 이름검색 완료
            } else if (Model === "user_email") {
                resultList = await userAuthService.getUsersWithRestrict2({
                    pieceword,
                }); //* 이메일검색 완료
            } else if (modelName.includes(Model)) {
                const errorMessage = " 추후 구현할 예정입니다.";
                res.status.json(errorMessage);
            } else {
                const errorMessage = "검색하려는 정확한 타입을 골라주세요.";
                res.status(400).json(errorMessage);
            }

            res.status(200).json(resultList);
        } catch (error) {
            next(error);
        }
    }
);

userAuthRouter.delete("/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.params.id;

        if (req.currentUserId !== user_id) {
            throw new Error("접근권한이 없습니다.");
        }

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
