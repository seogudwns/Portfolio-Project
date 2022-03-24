import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

function EducationForm({
    school,
    major,
    position,
    fromDate,
    toDate,
    setSchool,
    setMajor,
    setPosition,
    setFromDate,
    setToDate,
    setIsAdding,
    setIsEditing,
    type,
}) {
    return (
        <>
            <Form.Group className="mb-3" controlId="EducationSchool">
                <Form.Control
                    type="text"
                    placeholder="학교 이름"
                    autoComplete="off"
                    value={school}
                    onChange={(event) => setSchool(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EducationMajor">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    autoComplete="off"
                    value={major}
                    onChange={(event) => setMajor(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EducationDate">
                <Row className="mb-3">
                    <Col xs="auto">재학 기간</Col>

                    <Col xs="auto">
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                        />
                    </Col>
                    <Col xs="auto">
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                        />
                    </Col>
                </Row>
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

            <Form.Group as={Row} className="mb-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            if (type === "ADDING") {
                                setSchool("");
                                setMajor("");
                                setPosition("재학중");
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
