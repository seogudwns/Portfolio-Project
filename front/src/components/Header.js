import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faUsersBetweenLines,
    faRightFromBracket,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as LogoGray } from "../img/logo_gray.svg";
import "./Header.css";
import ThemeContext  from "./Theme"

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
    const isLogin = !!userState.user;

    // 로그아웃 클릭 시 실행되는 함수
    const logout = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem("userToken");
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: "LOGOUT" });
        // 기본 페이지로 돌아감.
        navigate("/");
    };

    return (
        <Nav activeKey={location.pathname} className="nav">
            <LogoGray className="nav-logo" />
            <div className="nav-icons">
                {/* <button onClick={() => toggleTheme()}>
                    {theme}
                </button> */}
                {theme === "light" ? 
                    <FontAwesomeIcon 
                        className="fontawesome-icon nav-icons__icon"
                        icon={faMoon}
                        onClick={() => toggleTheme()} 
                    /> : 
                    <FontAwesomeIcon 
                        className="fontawesome-icon nav-icons__icon"
                        icon={faSun}
                        onClick={() => toggleTheme()} 
                    />
                }
                <FontAwesomeIcon
                    className="fontawesome-icon nav-icons__icon"
                    icon={faCircleUser}
                    onClick={() => navigate("/")}
                />
                <FontAwesomeIcon
                    className="fontawesome-icon nav-icons__icon"
                    icon={faUsersBetweenLines}
                    onClick={() => navigate("/network")}
                />
                {isLogin && (
                    <FontAwesomeIcon
                        className="fontawesome-icon nav-icons__icon"
                        icon={faRightFromBracket}
                        onClick={logout}
                    />
                )}
            </div>

            {/* <Nav.Item className="me-auto mb-5">
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate("/")}>나의 페이지</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate("/network")}>
                    네트워크
                </Nav.Link>
            </Nav.Item>
            {isLogin && (
                <Nav.Item>
                    <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
            )} */}
        </Nav>
    );
}

export default Header;
