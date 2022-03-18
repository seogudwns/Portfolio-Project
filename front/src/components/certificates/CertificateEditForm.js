import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({ certificate, setCertificates, setIsEditing }) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [startDate, setStartDate] = useState(new Date())  // 수정

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // "certificates/유저id" 엔드포인트로 PUT 요청
    await Api.put(`certificates/${certificate.id}`, {
      title,
      description,
    });

    // "certificatelist/유저id" 엔드포인트로 GET 요청
    const res = await Api.get("certificatelist", certificate.id);

    setCertificates([res.data]);
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="certificateEditTitle" className="mt-3">
            <Form.Control
              type="text"
              placeholder="자격증 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDescription" className="mt-3">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDate" className="mt-3">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CertificateEditForm;