import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  const { title, description } = certificate;

  return (
    <>
      <Card.Text>
          <Row className="align-items-center">
            <Col>
              <span>{title}</span><br />
              <span>{description}</span>
            </Col>
            {isEditable && (
              <Col xs lg="1">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
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

export default CertificateCard;


