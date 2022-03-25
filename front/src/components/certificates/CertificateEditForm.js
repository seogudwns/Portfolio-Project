import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";
import dateToString from "../../utils/dateToString";

function CertificateEditForm({ certificate, setCertificates, setIsEditing }) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [expired_date, setExpiredDate] = useState(new Date(certificate.expired_date));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // "certificates/유저id" 엔드포인트로 PUT 요청
      const res = await Api.put(`certificates/${certificate.id}`, {
        title,
        description,
        expired_date: dateToString(expired_date),
      });

      setCertificates((current) => {
        return current.map((item) => {
            if (item.id === certificate.id) {
                return res.data;
            }
            return item;
        });
    });

    setIsEditing(false);
    } catch (err) {
      alert("자격증 정보를 수정하지 못했습니다", err);
    }
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
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="certificateEditDescription" className="mt-3">
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
