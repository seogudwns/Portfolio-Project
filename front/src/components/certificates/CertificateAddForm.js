import React, { useState } from 'react';
import {  Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expired_date , setExpiredDate] = useState(new Date())

    const dateToString = (date) => {
      return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
          // "certificate/create" 엔드포인트로 post요청
          const res = await Api.post("certificate/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            expired_date: dateToString(expired_date),
          });

          setCertificates(current => [...current, res.data]);
          setIsAdding(false);
      } catch (e) {
          console.log("자격증 정보를 등록하지 못했습니다.", e);
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="certificateAddTitle" className="mt-3">
          <Form.Control
            type="text"
            placeholder="자격증 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="certificateAddDescription" className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div controlId="certificateEditDate" className="mt-3 row">
          <div className="col-auto">
            <DatePicker selected={expired_date} onChange={(date) => setExpiredDate(date)} />
          </div>
        </div>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)} >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
}

export default CertificateAddForm;
