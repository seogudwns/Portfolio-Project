import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

function ProjectCard({ project, setIsEditing, isEditable, setProjects }) {
    const { title, description, from_date, to_date, result, id } = project;

    const deleteHandler = async () => {
        try {
            if (window.confirm("정말로 프로젝트를 삭제 하시겠습니까?")) {
                await Api.delete(`projects/${project.id}`);
                setProjects((current) => {
                    return current.filter((item) => item.id !== id);
                });
            }
        } catch (err) {
            alert("프로젝트를 삭제하지 못했습니다.", err);
        }
    };

    return (
        <>
            <Card.Text>
                <Row className="align-items-center">
                    <Col>
                        <div className="title">{title}</div>
                        <div className="description-1">{description}</div>
                        <div className="description-2">{result}</div>
                        <div className="date">{`${from_date} ~ ${to_date}`}</div>
                    </Col>
                    {isEditable && (
                        <Col lg={1} xs={true}>
                            <FontAwesomeIcon
                                className="fontawesome-icon edit-pen"
                                onClick={() => setIsEditing(true)}
                                icon={faPen}
                            />
                            <FontAwesomeIcon
                                className="fontawesome-icon delete-xmark"
                                onClick={() => deleteHandler()}
                                icon={faXmark}
                            />
                        </Col>
                    )}
                </Row>
            </Card.Text>
        </>
    );
}

export default ProjectCard;
