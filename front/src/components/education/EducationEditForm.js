// TODO: 등록된 Education의 편집 버튼 눌렀을 경우 나타나는 Form 구현
// 해당 학력 바로 아래
// 원래 저장되어 있는 값 input box default 값으로 보이기
/**
 * 2개의 input box (학교 이름 / 전공)
 * 4개의 radio input (재학중 / 학사졸업 / 석사졸업 / 박사졸업)
 * submit 버튼
 * 취소 버튼
 **/
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({setIsEditing, education, setEducations}) {
    const [school, setSchool] = useState(education.school);
    const [major, setMajor] = useState(education.major);
    const [position, setPosition] = useState(education.position);

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const { id } = education;
            const res = await Api.put(`educations/${id}`, {
                school,
                major,
                position,
            });
            const editEducation = res.data;

            // console.log(editEducation);
            setEducations((current) => {
                return current.map((edu) => {
                    if (edu.id === id) {
                        return editEducation;
                    }

                    return edu;
                });
            });

            setIsEditing(false);
        } catch (err) {
            console.log("학력 정보를 수정하지 못했습니다", err);
        }
    }


    return (
        <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="EducationSchoolEdit">
                <Form.Control 
                    type="text"
                    placeholder="학교 이름"
                    autoComplete="off"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EducationMajorEdit">
                <Form.Control 
                    type="text"
                    placeholder="전공"
                    autoComplete="off"
                    value={major}
                    onChange={e => setMajor(e.target.value)}
                />
            </Form.Group>

            <div key={"inline-radio"} 
                className="mb-3"
                onChange={e => setPosition(e.target.value)}
            >
                <Form.Check
                    inline
                    label="재학중"
                    name="position"
                    type={"radio"}
                    id={`inline-radio-1`}
                    value={"재학중"}
                    checked={position === "재학중"}
                />
                <Form.Check
                    inline
                    label="학사졸업"
                    name="position"
                    type={"radio"}
                    id={`inline-radio-2`}
                    value={"학사졸업"}
                    checked={position === "학사졸업"}
                />
                <Form.Check
                    inline
                    label="석사졸업"
                    name="position"
                    type={"radio"}
                    id={`inline-radio-3`}
                    value={"석사졸업"}
                    checked={position === "석사졸업"}
                />
                <Form.Check
                    inline
                    label="박사졸업"
                    name="position"
                    type={"radio"}
                    id={`inline-radio-4`}
                    value={"박사졸업"}
                    checked={position === "박사졸업"}
                />
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
    );
}

export default EducationEditForm;