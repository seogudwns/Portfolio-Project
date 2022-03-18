import React, { useState } from 'react';
import {  Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateAddForm({ portfolioOwnerId, setCertificates, setIsAdding }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date())

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // "certificate/create" 엔드포인트로 post요청
        await Api.post("certificate/create", {
          user_id: portfolioOwnerId,
          title,
          description,
        });
        
        // "certificatelist/유저id" 엔드포인트로 get요청
        const res = await Api.get("certificatelist", portfolioOwnerId);
        
        // res의 data로 세팅
        setCertificates(res.data)
        setIsAdding(false);
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

        <div controlId="certificateEditDate" className="mt-3">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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
