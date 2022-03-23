// TODO: 하나의 학력 카드 보여주기 구현
// 본인 id 일 경우 편집 버튼 보이기
import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
    const deleteHandler = async () => {
        const { id } = education;

        await Api.delete(`educations/${id}`);

        if (window.confirm("Are you sure you want to delete this project?")) {
            setEducations((current) => {
                return current.filter((edu) => edu.id !== id);
            });
        }
    };

    return (
        <>
            <Card.Text>
                <Row className="align-items-center">
                    <Col>
                        <span>{education?.school}</span>
                        <br />
                        <span className="text-muted">
                            {education?.major} ({education?.position})
                        </span>
                        <br />
                        <span>
                            {`${education?.from_date.substr(0, 7)} ~ 
                            ${education?.to_date.substr(0, 7)}`}
                        </span>
                    </Col>
                    {isEditable && (
                        <Col lg={1} xs={true}>
                            <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="mr-3"
                            >
                                편집
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="mr-3 mt-1"
                                onClick={() => deleteHandler()}
                            >
                                삭제
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Text>
        </>
    );
}

export default EducationCard;
