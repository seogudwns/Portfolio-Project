import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";
import ThemeContext from "../Theme";

function Projects({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [projects, setProjects] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        Api.get("projects/list", portfolioOwnerId).then((res) => {
            setProjects(res.data);
        });
    }, [portfolioOwnerId]);

    const projectlist = projects.map((project) => (
        <Project
            project={project}
            isEditable={isEditable}
            setProjects={setProjects}
        />
    ));

    return (
        <Card className="mb-2">
            <Card.Body
                className={`${theme}`}
                style={{ borderRadius: "0.25rem" }}
            >
                <Card.Title className="component-name">프로젝트</Card.Title>
                {projectlist}
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center mb-4">
                            <Col sm={{ span: 20 }}>
                                {!isAdding ? (
                                    <Button
                                        variant="primary"
                                        onClick={() => setIsAdding(true)}
                                    >
                                        +
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        onClick={() => setIsAdding(false)}
                                    >
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
