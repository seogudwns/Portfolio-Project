import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

import EmailForm from "./EmailForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShowEmailForm(false);

    function EmailHandler(event) {
        event.preventDefault();

        setShowEmailForm(true);
    }

    return (
        <div className="usercard">
            <img
                className="usercard-img"
                src={user?.image_url}
                alt="불러오기 실패"
            />
            <div className="usercard-name">{user?.name}</div>

            {!isNetwork ? (
                <Link to="#">
                    <div className="usercard-email" onClick={EmailHandler}>
                        {user?.email}
                    </div>
                </Link>
            ) : (
                <div className="usercard-email">{user?.email}</div>
            )}
            <div className="usercard-description">{user?.description}</div>
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
    );
}

export default UserCard;
