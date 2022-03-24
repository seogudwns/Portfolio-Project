import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function AwardAddForm({ portfolioOwnerId, setIsAdding, setAwards }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [awardDate, setAwardDate] = useState(new Date());

    const when_date = dateToString(awardDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newAward = {
            user_id: portfolioOwnerId,
            title,
            description,
            when_date,
        };

        try {
            const res = await Api.post("awards", newAward);

            setAwards((current) => [...current, res.data]);
            setIsAdding(false);
        } catch (err) {
            console.log("수상내역 등록에 실패하였습니다.", err);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="awardAddTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="awardAddDescription" className="mt-3">
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
                            selected={awardDate}
                            onChange={(date) => setAwardDate(date)}
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

export default AwardAddForm;
