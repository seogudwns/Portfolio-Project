import { Card, Row, Button, Col } from "react-bootstrap";

function AwardCard({ award, setIsEditing, isEditable }) {
  const { title, description } = award;

  return (
    <>
      <Card.Text>
          <Row className="align-items-center">
            <Col>
              <span>{title}</span>
              <br />
              <span className="text-muted">{description}</span>
            </Col>
            {isEditable && (
            <Col lg={1} xs={true}>
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

export default AwardCard;
