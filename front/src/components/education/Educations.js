// TODO: 등록된 학력 목록 보여주기 구현
// user 데이터에 등록된 학력 개수만큼 보여주기
import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

import * as Api from "../../api";

function Educations({ portfolioOwnerId, isEditable }) {
    // useState 훅으로 isAdding 상태를 생성하여, 추가 폼을 나타낼지 말지 결정

    const [isAdding, setIsAdding] = useState(false);
    const [educations, setEducations] = useState([]);

    const handleAddClick = () => {
        setIsAdding((current) => !current);
    };

    // "educationlist/유저id" 엔드포인트로 GET 요청
    useEffect(() => {
        Api.get("educationlist", portfolioOwnerId).then((res) => {
            setEducations(res.data);
        });
    }, [portfolioOwnerId]);

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {educations.map((education) => (
                    <Education
                        education={education}
                        isEditable={isEditable}
                        setEducations={setEducations}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button
                                className="btn btn-primary"
                                onClick={handleAddClick}
                            >
                                {!isAdding ? "+" : "-"}
                            </Button>
                        </Col>
                    </Row>
                )}
                {isEditable && isAdding ? (
                    <EducationAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setIsAdding={setIsAdding}
                        setEducations={setEducations}
                    />
                ) : (
                    <></>
                )}
            </Card.Body>
        </Card>
    );
}

export default Educations;
