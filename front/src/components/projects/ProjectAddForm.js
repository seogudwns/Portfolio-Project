import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setIsAdding, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const dateToString = date => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const from_date = dateToString(fromDate);
  const to_date = dateToString(toDate);

  const handleSubmit = async e => {
    e.preventDefault();

    const newProject = {
      user_id: portfolioOwnerId,
      title,
      description,
      from_date,
      to_date,
    };

    //* 비동기통신

    try {
      const res = await Api.post("project/create", newProject);

      setProjects(current => [...current, res.data]);
      setIsAdding(false);
    } catch (e) {
      console.log("프로젝트 등록에 실패하였습니다.", e);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectAddTitle">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="projectAddDescription" className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Row className="mt-3">
            <Col xs="auto">
              <DatePicker
                selected={fromDate}
                onChange={date => setFromDate(date)}
              />
            </Col>
            <Col xs="auto">
              <DatePicker
                selected={toDate}
                onChange={date => setToDate(date)}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default ProjectAddForm;
