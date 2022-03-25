// TODO: 하나의 학력 카드 보여주기 구현
// 본인 id 일 경우 편집 버튼 보이기
import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import * as Api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

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
                        <div className="title">{education?.school}</div>
                        <div className="description-1">
                            {education?.major} ({education?.position})
                        </div>
                        <div className="date">
                            {`${education?.from_date.substr(0, 7)} ~ 
                            ${education?.to_date.substr(0, 7)}`}
                        </div>
                    </Col>
                    {isEditable && (
                        <Col lg={1} xs={true}>
                            <FontAwesomeIcon
                                className="fontawesome-icon edit-pen"
                                onClick={() => setIsEditing(true)}
                                icon={faPen}
                            />
                            <FontAwesomeIcon
                                className="fontawesome-icon delete-xmark"
                                onClick={() => deleteHandler()}
                                icon={faXmark}
                            />
                        </Col>
                    )}
                </Row>
            </Card.Text>
        </>
    );
}

export default EducationCard;