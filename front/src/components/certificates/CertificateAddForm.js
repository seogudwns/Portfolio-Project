import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expired_date, setExpiredDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // "certificates" 엔드포인트로 post요청
      const res = await Api.post("certificates", {
        user_id: portfolioOwnerId,
        title,
        description,
        expired_date: dateToString(expired_date),
      });

      setCertificates((current) => [...current, res.data]);
      setIsAdding(false);
    } catch (err) {
      alert("자격증 정보를 등록하지 못했습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="certificateAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>

      <div controlId="certificateEditDate" className="mt-3 row">
        <div className="col-auto">
          <DatePicker
            selected={expired_date}
            onChange={(date) => setExpiredDate(date)}
          />
        </div>
      </div>

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
  );
}

export default CertificateAddForm;
