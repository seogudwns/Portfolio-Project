// TODO: 등록된 학력 목록 보여주기 구현
// user 데이터에 등록된 학력 개수만큼 보여주기
import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

import * as Api from "../../api";
import ThemeContext  from "../Theme";

function Educations({ portfolioOwnerId, isEditable }) {
    // useState 훅으로 isAdding 상태를 생성하여, 추가 폼을 나타낼지 말지 결정

    const [isAdding, setIsAdding] = useState(false);
    const [educations, setEducations] = useState([]);
    const { theme } = useContext(ThemeContext);

    const handleAddClick = () => {
        setIsAdding((current) => !current);
    };

    // "educations/list/유저id" 엔드포인트로 GET 요청
    useEffect(() => {
        Api.get("educations/list", portfolioOwnerId).then((res) => {
            setEducations(res.data);
        });
    }, [portfolioOwnerId]);

    return (
        <Card className="mb-2">
            <Card.Body className={`${theme}`} style={{borderRadius:"0.25rem"}}>
                <Card.Title className="component-name">학력</Card.Title>
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
