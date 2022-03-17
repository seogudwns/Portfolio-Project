import React, { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
// import * as Api from "../../api";


function Projects({ portfolioOwnerId, isEditable }) {
    //! 더미데이터
    const dummyProjects = [{
        id: 1,
        user_id: "abc1",
        title: "JS 프로젝트",
        description: "프론트엔드 역량을 위해 자바스크립트 프로젝트 진행",
        from_date: "2021-05-20",
        to_date: "2021-06-20",
    },{
        id: 2,
        user_id: "def2",
        title: "express 프로젝트",
        description: "백엔드 역량을 위해 express 프로젝트 진행",
        from_date: "2021-07-20",
        to_date: "2021-08-20",
    },{
        id: 3,
        user_id: "ghi3",
        title: "react 프로젝트",
        description: "프론트엔드 역량을 위해 리액트 프로젝트 진행",
        from_date: "2021-09-20",
        to_date: "2021-10-20",
    },]
    
    const [isAdding, setIsAdding] = useState(false);
    const [projects, setProjects] = useState(dummyProjects);

    //* 비동기통신
    /* 
    useEffect(() => {
        Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
    }, [portfolioOwnerId]);
    */

    const projectlist = projects.map((project) => <Project project={project} isEditable={isEditable} setProjects={setProjects} />)

    return (
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {projects && projectlist}
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center mb-4">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    variant="primary"
                                    onClick={() => setIsAdding(true)}
                                >
                                    +
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}
                {isAdding && (
                    <ProjectAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setIsAdding={setIsAdding}
                        setProjects={setProjects}
                        newProjectId={(projects.at(-1).id+1)}
                    />
                )}
            </Card.Body>
        </Card>

    )
}

export default Projects;
