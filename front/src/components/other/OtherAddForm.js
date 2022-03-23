import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function OtherAddForm({ portfolioOwnerId, setIsAdding, setOthers }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [otherDate, setOtherDate] = useState(new Date());

    const date = dateToString(otherDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newOther = {
            user_id: portfolioOwnerId,
            title,
            description,
            date,
        };

        //* 비동기통신

        try {
            const res = await Api.post("others", newOther);

            setOthers((current) => [...current, res.data]);
            setIsAdding(false);
        } catch (err) {
            console.log("기타활동 등록에 실패하였습니다.", err);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="OtherAddTitle">
                <Form.Control
                    type="text"
                    placeholder="기타활동 제목"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="OtherAddDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mt-3">
                <Row className="mt-3">
                    <Col xs="auto">
                        <DatePicker
                            selected={otherDate}
                            onChange={(date) => setOtherDate(date)}
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setIsAdding(false)}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default OtherAddForm;
