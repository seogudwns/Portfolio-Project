import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard ({ project, setIsEditing, isEditable }) {
  const { title, description } = project;
  const fromDate = project.from_date;
  const toDate = project.to_date;

  return (
    <>
      <Card.Text>
          <Row className="align-items-center">
            <Col>
              <span>{title}</span>
              <br />
              <span className="text-muted">{description}</span>
              <br />
              <span className="text-muted">{fromDate + " ~ " + toDate}</span>
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

export default ProjectCard;
