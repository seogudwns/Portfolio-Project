import {
    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import { Card, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "./user/hooks/useScript";
import { useEffect, useContext } from "react";
import ThemeContext from "./Theme";
import kakaoLogo from "../img/kakao.png";

import "./Share.css";

function Share({ portfolioOwnerId, isMyPage }) {
    //! 현재 사이트 주소가 localhost라서 페이스북 공유는 작동하지않음 Parameter 'href' should represent a valid URL
    const currentUrl = isMyPage
        ? `${window.location.href}users/${portfolioOwnerId}`
        : window.location.href;
    const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (status === "ready" && window.Kakao) {
            // 중복 initialization 방지
            if (!window.Kakao.isInitialized()) {
                // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
                window.Kakao.init("03275b6afc39a3fec9589a681fba4e5f");
            }
        }
    }, [status]);

    const handleKaKaoButton = () => {
        window.Kakao.Link.sendScrap({
            requestUrl: currentUrl,
        });
    };

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: "25rem" }}>
            <Card.Body className={`${theme}`} style={{borderRadius:"0.25rem"}}>
                <Row>
                    <Card.Title className="text-center">공유하기</Card.Title>
                </Row>
                <Row>
                    <Col className="text-center text-info">
                        <FacebookShareButton url={currentUrl}>
                            <FacebookIcon
                                size={48}
                                round={true}
                                borderRadius={24}
                            ></FacebookIcon>
                        </FacebookShareButton>
                        <TwitterShareButton url={currentUrl}>
                            <TwitterIcon
                                size={48}
                                round={true}
                                borderRadius={24}
                            ></TwitterIcon>
                        </TwitterShareButton>
                        <CopyToClipboard text={currentUrl}>
                            <button className="URLShareButton">URL</button>
                        </CopyToClipboard>
                        <a
                            onClick={handleKaKaoButton}
                            className="KakaoShareButton"
                        >
                            <img src={kakaoLogo} className="KaKaoIcon"></img>
                        </a>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Share;
