import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

import EmailForm from "./EmailForm";

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
        // <div className="usercard">
        //     <img
        //         className="mb-3 usercard-img"
        //         src="http://placekitten.com/200/200"
        //         alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
        //     />
        //     <div className="usercard-name">{user?.name}</div>
        //     <div className="usercard-email">{user?.email}</div>
        //     <div className="usercard-description">{user?.description}</div>

        //     {isEditable && (
        //         <Col>
        //             <Row className="mt-3 text-center text-info">
        //                 <Col sm={{ span: 20 }}>
        //                     <Button
        //                         variant="outline-info"
        //                         size="sm"
        //                         onClick={() => setIsEditing(true)}
        //                     >
        //                         편집
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Col>
        //     )}
        // </div>
        <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img
                        style={{ width: "10rem", height: "8rem" }}
                        className="mb-3"
                        src="http://placekitten.com/200/200"
                        alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
                    />
                </Row>
                <Card.Title>{user?.name}</Card.Title>
                {!isNetwork ? (
                    <Card.Link href="#" onClick={EmailHandler}>
                        {user?.email}
                    </Card.Link>
                ) : (
                    <Card.Subtitle className="mb-2 text-muted">
                        {user?.email}
                    </Card.Subtitle>
                )}
                <Card.Text>{user?.description}</Card.Text>

                <EmailForm
                    userEmail={user?.email}
                    toName={user?.name}
                    handleClose={handleClose}
                    show={showEmailForm}
                />

                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    편집
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}

                {isNetwork && (
                    <Card.Link
                        className="mt-3"
                        href="#"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        포트폴리오
                    </Card.Link>
                )}
            </Card.Body>
        </Card>
    );
}

export default UserCard;
