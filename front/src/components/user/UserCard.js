import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

import EmailForm from "./EmailForm";
import ThemeContext  from "../Theme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const handleClose = () => setShowEmailForm(false);

    function EmailHandler(event) {
        event.preventDefault();

        setShowEmailForm(true);
    }

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
                        <FontAwesomeIcon
                            className="fontawesome-icon edit-pen"
                            onClick={() => setIsEditing(true)}
                            icon={faPenToSquare}
                        />
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

                                <div className="usercard-email">
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
