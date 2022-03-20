import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId).then(res => {
      console.log(res.data);
      return setProjects(res.data);
    });
  }, [portfolioOwnerId]);

  const projectlist = projects.map(project => (
    <Project
      project={project}
      isEditable={isEditable}
      setProjects={setProjects}
    />
  ));

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects && projectlist}
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                {!isAdding ? (
                  <Button variant="primary" onClick={() => setIsAdding(true)}>
                    +
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setIsAdding(false)}>
                    -
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
            setProjects={setProjects}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
