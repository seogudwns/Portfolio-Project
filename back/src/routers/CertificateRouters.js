import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/CertificateServices";

// 자격증 라우터
const certificateAuthRouter = Router();

// !
// ?
// *
// TODO

//! 코딩과는 다르게 주석은 아래에서 위로 적어놓겠습니다.  -  HJ.


//! 작용기능 자체는 인스타 혹은 밀리의 서재랑 비슷하게 하면 되지 않을까? ... 작동하는 원리를 보면 내 이해가 부족한 것 일 수 있으니 좀 더 세세하게 살펴볼 것!
//! 또다른 login_required를 만들 필요성.. userservice를 제외한?포함한? 모든 곳에서 사용.. 2단계 OTP랑 비슷하고, 

//! 모든 것에 login_required를 넣는 것이 맞아보임.. 외부 수정을 막는 기능?.... 기관 인증은 어떻게??.... 더 생각해볼 것!

//? 중복확인은 어디로 들어가면 좋을까?.. 생성, 수정 둘 다 넣는 방법은?  날짜범위 지정은 어떻게 하면 좋을까?

// data = 
//{"user_id":"870bd421-61bb-4b50-8c7d-88d216f33bcc","title":"qqe","description":"123","when_date":"2022-03-16"}

// 자격증 생성.
certificateAuthRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req 에서 데이터 가져오기
    const user_id = req.currentUserId;
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    //! addCertificate 만들기.. 여기서 중복 확인? .... 만약 들어간다면 수정에도 마찬가지로 들어가야함.. 요청시 확인할 것.
    // 위 데이터를 유저 db에 추가하기
    const newCertificate = await certificateAuthService.addCertificate({
      user_id,
      title,
      description,
      when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 로딩했을 때 보여지는 자격증들.. //! 이거는 login_required를 써야하나??
certificateAuthRouter.get("/certificatelist/:user_id", async function (req, res, next) {

})

//수정 기능.. //? login_required 및 자기 아이디라는 것에 대한 확인(service) 필요.
certificateAuthRouter.put("/certificate/:user_id", async function (req, res, next) {
  try {
    // req에서 데이터 가져오기
    const user_id = req.params.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // 위 데이터를 이용하여 certificate db에서 유저 찾기
    const certificate = await certificateAuthService.getCertificate({ user_id, title, description, when_date });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

//수정기능에서 버튼 하나 누르면 alert에서 확인 후 삭제하는 것으로 충분하지 않을까?  ---  혹시 모르니 만들어놓은 기능.
//자격증에 대한 정보를 잘못 작성하거나 했을 때 쓸 것! 상대적으로 엄청나게 낮은 중요도를 가지고 있고, 
certificateAuthRouter.delete('/certificate/:user_id', async function (req, res, next) {

})


//날짜 갱신기능.. 갱신되는 날짜는 항상 기존의 날짜 뒤로.. //! 어떤 아이디어를 쓸지 고민해볼 것!
certificateAuthRouter.put('/certificate/:user_id/date_update', async function (req, res, next) {

})


////////////////////////////////////////////// ! user_id update.. 참고하기.
userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);



//? 마지막은 아이디어로써 잘 생각해볼만 하려나?
//! 아래 2개는 어떤 역할을 하는 것이지??... 

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
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
  }
);


userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { certificateAuthRouter };
