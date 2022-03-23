// TODO: 버튼 누를 시 학력카드를 추가하는 Form 구현
// 버튼 바로 아래
/**
 * 2개의 input box (학교 이름 / 전공)
 * 4개의 radio input (재학중 / 학사졸업 / 석사졸업 / 박사졸업)
 * submit 버튼
 * 취소 버튼
 **/
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import dateToString from "../../utils/dateToString";
import EducationForm from "./EducationForm";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setIsAdding, setEducations }) {
    // education 정보 - 기능 개선으로 Date 추가
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("재학중");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleAddSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await Api.post("educations", {
                user_id: portfolioOwnerId,
                school,
                major,
                position,
                from_date: dateToString(fromDate),
                to_date: dateToString(toDate),
            });
            const newEducation = res.data;

            setEducations((current) => [...current, newEducation]);
            setIsAdding(false);
        } catch (err) {
            alert("학력 정보를 등록하지 못했습니다", err);
        }
    };

    return (
        <Form onSubmit={handleAddSubmit}>
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
                setIsAdding={setIsAdding}
                type="ADDING"
            />
        </Form>
    );
}

export default EducationAddForm;
