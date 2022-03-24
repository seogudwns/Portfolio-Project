import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function ProjectAddForm({ portfolioOwnerId, setIsAdding, setProjects }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const from_date = dateToString(fromDate);
    const to_date = dateToString(toDate);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProject = {
            user_id: portfolioOwnerId,
            title,
            description,
            result,
            from_date,
            to_date,
        };

        //* 비동기통신

        try {
            const res = await Api.post("projects", newProject);

            setProjects((current) => [...current, res.data]);
            setIsAdding(false);
        } catch (err) {
            console.log("프로젝트 등록에 실패하였습니다.", err);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectAddTitle">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="projectAddDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="projectAddResult" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="결과물"
                    value={result}
                    onChange={(event) => setResult(event.target.value)}
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

export default ProjectAddForm;
