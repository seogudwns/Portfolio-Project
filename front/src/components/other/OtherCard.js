import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

function OtherCard({ other, setIsEditing, isEditable, setOthers }) {
    const { title, description, from_date, to_date, id } = other;

    const deleteHandler = async () => {
        try {
            if (window.confirm("정말로 기타활동을 삭제 하시겠습니까?")) {
                await Api.delete(`others/${other.id}`);
                setOthers((current) => {
                    return current.filter((item) => item.id !== id);
                });
            }
        } catch (err) {
            alert("기타활동을 삭제하지 못했습니다.", err);
        }
    };

    return (
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
    );
}

export default OtherCard;
