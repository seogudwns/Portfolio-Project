import { Card, Row, Button, Col } from "react-bootstrap";

function AboutCard({ userAbout, setIsEditing, isEditable }) {
    return (
        <>
            <Card.Subtitle>블로그</Card.Subtitle>
            <Card.Link href={userAbout.blog}>{userAbout?.blog}</Card.Link>
            <Card.Subtitle className="mt-2">주요 기술</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
                {userAbout?.skill.join(", ")}
            </Card.Text>
            <Card.Subtitle>희망 직무</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
                {userAbout?.position}
            </Card.Text>
            <Card.Subtitle>취미</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
                {userAbout?.hobby.join(", ")}
            </Card.Text>

            {isEditable && (
                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                            >
                                편집
                            </Button>
                        </Col>
                    </Row>
                </Col>
            )}
        </>
    );
}

export default AboutCard;
