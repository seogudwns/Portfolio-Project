import jwt from "jsonwebtoken";

function login_required(req, res, next) {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
    if (userToken === "null") {
        console.log(
            "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음",
        );
        res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
        return;
    }

    // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        console.log(req.user);
        console.log(jwtDecoded.user_id);

        if (jwtDecoded.user_id !== req.user) {
            const errorMessage =
                "JWT 토큰 정보와 현재 로그인 유저가 일치하지 않습니다.";
            return { errorMessage };
        }

        req.currentUserId = jwtDecoded.user_id;
        next();
    } catch (error) {
        res.status(400).json({ errorMessage: error.message }); // 토큰 만료시, { "jwt expired" } 객체 반환
        return;
    }
}

export { login_required };
