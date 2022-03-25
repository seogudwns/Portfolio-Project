import React, { useState, useEffect } from "react";
import { init, send } from "emailjs-com";
import { Modal, Form, Button } from "react-bootstrap";

function EmailForm({ userEmail, toName, handleClose, show }) {
    const [fromName, setFromName] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        init("rCd7LLcggPr8C3K0N");
    }, []);

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const emailData = {
            userEmail,
            toName,
            fromName,
            contact,
            message,
        };

        await send("service_v7ltb16", "template_92v5kp9", emailData)
            .then((response) => {
                alert("이메일이 전송 되었습니다.");
            })
            .catch((error) => {
                alert("올바르게 전송되지 못했습니다. 다시 시도해주세요", error);
            });
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        메일 전송
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group contorlId="EmailAddName" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="이름"
                            value={fromName}
                            onChange={(event) =>
                                setFromName(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group contorlId="EmailAddContact" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="연락처"
                            value={contact}
                            onChange={(event) => setContact(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group contorlId="EmailAddMessage">
                        <Form.Control
                            type="text"
                            placeholder="메세지"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={onSubmitForm}
                    >
                        보내기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmailForm;
