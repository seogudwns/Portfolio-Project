import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setThisAward }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(award.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(award.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "awards/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`awards/${award.id}`, {
      title,
      description,
    });
    // 해당 유저 정보로 awards을 세팅함.
    const updatedAward = res.data; 
    
    setThisAward(updatedAward);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="awardEditDescription">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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

export default AwardEditForm;
