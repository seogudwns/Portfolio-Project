import { Card, Row, Button, Col } from "react-bootstrap";

function UserCard({ award, setIsEditing, isEditable }) {
  const { title, description } = award;

  return (
    <>
      <Card.Text>
          <Row className="align-items-center">
            <Col>
              {title}
              {description}
            </Col>
            {isEditable && (
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
            )}
          </Row>
      </Card.Text>
    </>
  );
}

export default UserCard;
