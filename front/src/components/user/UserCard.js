import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import "./UserCard.css";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
    const navigate = useNavigate();

    return (
        <div className="usercard">
            <img
                className="mb-3 usercard-img"
                src="http://placekitten.com/200/200"
                alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
            />
            <div className="usercard-name">{user?.name}</div>
            <div className="usercard-email">{user?.email}</div>
            <div className="usercard-description">{user?.description}</div>

            {isEditable && (
                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                            >
                                편집
                            </Button>
                        </Col>
                    </Row>
                </Col>
            )}
        </div>
    );
}

export default UserCard;
