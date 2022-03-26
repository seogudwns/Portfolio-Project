import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import NetworkScroll from "./NetworkScroll";
import ThemeContext  from "../Theme";

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const { theme } = useContext(ThemeContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate("/login");
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get("users/list").then((res) => {
            setUsers(res.data);
        });
    }, [userState, navigate]);

    return (
        <div className={`${theme}`} style={{ marginBottom: 100 }}>
            {users.length !== 0 ? (
                <NetworkScroll users={users} />
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
}

export default Network;
