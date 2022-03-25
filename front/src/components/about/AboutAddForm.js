import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import "react-bootstrap-typeahead/css/Typeahead.css";

import * as Api from "../../api";

function AboutAddForm({ setUserAbout, userId }) {
    const [blog, setBlog] = useState("");
    const [skill, setSkill] = useState([]);
    const [position, setPosition] = useState("");
    const [hobby, setHobby] = useState("");

    const options = [
        "Java",
        "JavaScript",
        "TypeScript",
        "Python",
        "C",
        "C++",
        "C#",
        "AngularJS",
        "ReactJS",
        "VueJS",
        "ExpressJS",
        "NodeJS",
        "Flutter",
        "Flask",
        "Django",
        "Spring",
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newAbout = {
            user_id: userId,
            blog,
            skill,
            position,
            hobby,
        };
        try {
            const res = await Api.post(`abouts`, newAbout);

            setUserAbout(res.data);
        } catch (err) {
            console.log("관련사항 등록에 실패하였습니다.", err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="aboutAddBlog" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="블로그"
                    value={blog}
                    onChange={(event) => setBlog(event.target.value)}
                    size="sm"
                />
            </Form.Group>

            <Form.Group controlId="aboutAddSkill" className="mb-3">
                <Typeahead
                    id="about-skill-multiple"
                    multiple
                    onChange={setSkill}
                    options={options}
                    placeholder="해당하는 기술스택을 선택하세요"
                    selected={skill}
                    size="sm"
                    emptyLabel="해당하는 기술이 없습니다 영어로 검색하세요"
                />
            </Form.Group>

            <Form.Group controlId="aboutAddPosition" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="희망 직무"
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                    size="sm"
                />
            </Form.Group>

            <Form.Group controlId="aboutAddHobby">
                <Form.Control
                    type="text"
                    placeholder="취미"
                    value={hobby}
                    onChange={(event) => setHobby(event.target.value)}
                    size="sm"
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default AboutAddForm;
