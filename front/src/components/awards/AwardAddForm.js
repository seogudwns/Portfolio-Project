import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setIsAdding, setAwards }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAward = {
            user_id: portfolioOwnerId,
            title,
            description
        };
        
        try {
            const res = await Api.post("award/create", newAward);

            setAwards((current) => ([ ...current, res.data])
            )
            setIsAdding(false);
        } catch (e) {
            console.log("수상내역 등록에 실패하였습니다.", e);
        }
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="awardAddTitle">
              <Form.Control
                type="text"
                placeholder="수상내역"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="awardAddDescription" className="mt-3">
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
                <Button variant="secondary" onClick={() => setIsAdding(false)} >
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </>
    );
}

export default AwardAddForm;