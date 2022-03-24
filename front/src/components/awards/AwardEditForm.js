import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function AwardEditForm({ award, setIsEditing, setAwards }) {
    //useState로 title 상태를 생성함.
    const [title, setTitle] = useState(award.title);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(award.description);
    //useState로 date 상태를 생성함.

    const [awardDate, setAwardDate] = useState(new Date(award.when_date));

    const when_date = dateToString(awardDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // "awards/유저id" 엔드포인트로 PUT 요청함.
            const res = await Api.put(`awards/${award.id}`, {
                title,
                description,
                when_date,
            });
            // 해당 유저 정보로 awards을 세팅함.
            const updatedAward = res.data;

            setAwards((current) => {
                return current.map((item) => {
                    if (item.id === award.id) {
                        return updatedAward;
                    }
                    return item;
                });
            });

            // isEditing을 false로 세팅함.
            setIsEditing(false);
        } catch (err) {
            alert("수상정보를 수정하지 못했습니다.", err);
        }
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="awardEditTitle" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="수상내역"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="awardEditDescription">
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
                                    selected={awardDate}
                                    onChange={(date) => setAwardDate(date)}
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

export default AwardEditForm;
