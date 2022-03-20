import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
function ProjectCard({ project, setIsEditing, isEditable, setThisProject }) {
  const { title, description, from_date, to_date } = project;

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setThisProject(null);
      await Api.delete(`project/${project.id}`);
    }
  };
  return (
    <>
      <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{title}</span>
            <br />
            <span className="text-muted">{description}</span>
            <br />
            <span className="text-muted">{`${from_date} ~ ${to_date}`}</span>
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
              <Button
                variant="outline-danger"
                size="sm"
                className="mr-3 mt-1"
                onClick={() => deleteHandler()}
              >
                삭제
              </Button>
            </Col>
          )}
        </Row>
      </Card.Text>
    </>
  );
}

export default ProjectCard;
