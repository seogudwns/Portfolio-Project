import { Form, Button, Row, Col } from "react-bootstrap";

function EducationForm({
    school,
    major,
    position,
    setSchool,
    setMajor,
    setPosition,
    setIsAdding,
    setIsEditing,
    type,
}) {
    return (
        <>
            <Form.Group className="mb-3" controlId="EducationSchoolAdd">
                <Form.Control
                    type="text"
                    placeholder="학교 이름"
                    autoComplete="off"
                    value={school}
                    onChange={(event) => setSchool(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EducationMajorAdd">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    autoComplete="off"
                    value={major}
                    onChange={(event) => setMajor(event.target.value)}
                />
            </Form.Group>

            <div
                key={"inline-radio"}
                className="mb-3"
                onChange={(event) => setPosition(event.target.value)}
            >
                <Form.Check
                    inline
                    label="재학중"
                    name="position"
                    type={"radio"}
                    id={"inline-radio-1"}
                    value={"재학중"}
                    checked={position === "재학중"}
                />
                <Form.Check
                    inline
                    label="학사졸업"
                    name="position"
                    type={"radio"}
                    id={"inline-radio-2"}
                    value={"학사졸업"}
                    checked={position === "학사졸업"}
                />
                <Form.Check
                    inline
                    label="석사졸업"
                    name="position"
                    type={"radio"}
                    id={"inline-radio-3"}
                    value={"석사졸업"}
                    checked={position === "석사졸업"}
                />
                <Form.Check
                    inline
                    label="박사졸업"
                    name="position"
                    type={"radio"}
                    id={"inline-radio-4"}
                    value={"박사졸업"}
                    checked={position === "박사졸업"}
                />
            </div>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            if (type === "ADDING") {
                                return setIsAdding(false);
                            } else if (type === "EDITING") {
                                return setIsEditing(false);
                            }
                        }}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </>
    );
}

export default EducationForm;
