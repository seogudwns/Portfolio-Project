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
import EducationForm from "./EducationForm";

import * as Api from "../../api";

function EducationEditForm({ setIsEditing, education, setEducations }) {
    const [school, setSchool] = useState(education.school);
    const [major, setMajor] = useState(education.major);
    const [position, setPosition] = useState(education.position);

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const { id } = education;
            const res = await Api.put(`educations/${id}`, {
                school,
                major,
                position,
            });
            const editEducation = res.data;

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
            alert("학력 정보를 수정하지 못했습니다", err);
        }
    };

    return (
        <Form onSubmit={handleEditSubmit}>
            <EducationForm
                school={school}
                major={major}
                position={position}
                setSchool={setSchool}
                setMajor={setMajor}
                setPosition={setPosition}
                setIsEditing={setIsEditing}
                type="EDITING"
            />
        </Form>
    );
}

export default EducationEditForm;
