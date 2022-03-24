import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function OtherEditForm({ other, setIsEditing, setOthers }) {
    const [title, setTitle] = useState(other.title);
    const [description, setDescription] = useState(other.description);
    const [fromDate, setFromDate] = useState(new Date(other.from_date));
    const [toDate, setToDate] = useState(new Date(other.to_date));

    const from_date = dateToString(fromDate);
    const to_date = dateToString(toDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // "project/유저id" 엔드포인트로 PUT 요청함.
        try {
            const res = await Api.put(`others/${other.id}`, {
                title,
                description,
                from_date,
                to_date,
            });
            // 해당 유저 정보로 project를 세팅함.
            const updatedOther = res.data;

            setOthers((current) => {
                return current.map((item) => {
                    if (item.id === other.id) {
                        return updatedOther;
                    }
                    return item;
                });
            });

            // isEditing을 false로 세팅함.
            setIsEditing(false);
        } catch (err) {
            alert("기타활동을 수정하지 못했습니다.", err);
        }
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="otherEditTitle" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="기타활동 제목"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="otherEditDescription">
                        <Form.Control
                            type="text"
                            placeholder="상세내역"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Row className="mt-3">
                            <Col xs="auto">
                                <DatePicker
                                    selected={fromDate}
                                    onChange={(date) => setFromDate(date)}
                                />
                            </Col>
                            <Col xs="auto">
                                <DatePicker
                                    selected={toDate}
                                    onChange={(date) => setToDate(date)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3 text-center">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="me-3"
                            >
                                확인
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                취소
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
export default OtherEditForm;
