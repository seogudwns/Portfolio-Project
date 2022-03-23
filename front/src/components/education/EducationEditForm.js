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

import dateToString from "../../utils/dateToString";
import EducationForm from "./EducationForm";
import * as Api from "../../api";

function EducationEditForm({ setIsEditing, education, setEducations }) {
    const [school, setSchool] = useState(education.school);
    const [major, setMajor] = useState(education.major);
    const [position, setPosition] = useState(education.position);
    const [fromDate, setFromDate] = useState(new Date(education.from_date));
    const [toDate, setToDate] = useState(new Date(education.to_date));

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const { id } = education;
            const res = await Api.put(`educations/${id}`, {
                school,
                major,
                position,
                from_date: dateToString(fromDate),
                to_date: dateToString(toDate),
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
                fromDate={fromDate}
                toDate={toDate}
                setSchool={setSchool}
                setMajor={setMajor}
                setPosition={setPosition}
                setFromDate={setFromDate}
                setToDate={setToDate}
                setIsEditing={setIsEditing}
                type="EDITING"
            />
        </Form>
    );
}

export default EducationEditForm;
