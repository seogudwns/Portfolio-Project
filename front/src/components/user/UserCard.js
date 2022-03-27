import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import EmailForm from "./EmailForm";
import ThemeContext from "../Theme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

import * as Api from "../../api";

function UserCard({
    user,
    setIsEditing,
    isEditable,
    portfolioOwnerId,
    isNetwork,
}) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const handleClose = () => setShowEmailForm(false);

    function EmailHandler(event) {
        event.preventDefault();

        setShowEmailForm(true);
    }

    // Delete /users/:id
    const deleteUser = async () => {
        try {
            if (window.confirm("회원 탈퇴를 진행하시겠습니까?")) {
                const res = await Api.delete("users", portfolioOwnerId);

                console.log(res.status);
                // ! 탈퇴 후 페이지에서 Portfolio 페이지 접속 시도할 때 Id가 남아 있어서 진행됨
                navigate("/intro", { replace: true });
            }
        } catch (err) {
            alert("회원 탈퇴 과정에 문제가 발생했습니다.", err);
        }
    };

    return (
        <>
            {!isNetwork ? (
                <div className="usercard">
                    <img
                        className="usercard-img"
                        src={user?.image_url}
                        alt="불러오기 실패"
                    />
                    <div className="usercard-name">{user?.name}</div>

                    {isEditable ? (
                        <div className="usercard-email">{user?.email}</div>
                    ) : (
                        <a
                            className="usercard-email"
                            href="#"
                            onClick={EmailHandler}
                        >
                            {user?.email}
                        </a>
                    )}

                    <div className="usercard-description">
                        {user?.description}
                    </div>

                    <EmailForm
                        userEmail={user?.email}
                        toName={user?.name}
                        handleClose={handleClose}
                        show={showEmailForm}
                    />

                    {isEditable && (
                        <div>
                            <FontAwesomeIcon
                                className="fontawesome-icon edit-pen"
                                onClick={() => setIsEditing(true)}
                                icon={faPenToSquare}
                            />
                            {/* 유저 탈퇴 기능 */}
                            <FontAwesomeIcon
                                className="fontawesome-icon delete-user"
                                onClick={deleteUser}
                                icon={faUserSlash}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="network-usercard-box">
                    <Card style={{ height: "200px", width: "1000px" }}>
                        <div className={`network-usercard ${theme}`}>
                            <img
                                className="usercard-img"
                                src={user?.image_url}
                                alt="불러오기 실패"
                            />

                            <div className="network-usercard__texts">
                                <div className="network-usercard__name">
                                    {user?.name}
                                </div>

                                <div className="network-usercard__email">
                                    {user?.email}
                                </div>

                                <div className="network-usercard__description">
                                    {user?.description}
                                </div>
                            </div>

                            <div
                                className="network-usercard__port-link"
                                onClick={() => navigate(`/users/${user.id}`)}
                            >
                                <span>포트폴리오</span>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}

export default UserCard;
