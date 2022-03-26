import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../img/logo_blue.svg";

import "./Intro.css";

function Intro() {
    const navigate = useNavigate();

    return (
        <div className="intro">
            <Logo className="intro-logo" />
            <div className="intro-text">
                <span>Express yourself!</span>
                <span>나를 표현하는 포트폴리오에 EU가 필요한 이유,</span>
            </div>
            <div className="intro-inbox">
                <div
                    className="intro-inbox__register"
                    onClick={() => navigate("/register")}
                >
                    지금 알아보러 가기
                </div>
                <div className="intro-inbox__login">
                    이미 회원이라면?
                    <span onClick={() => navigate("/login")}>로그인</span>
                </div>
            </div>
        </div>
    );
}

export default Intro;
