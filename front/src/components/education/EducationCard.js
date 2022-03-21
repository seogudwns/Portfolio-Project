// TODO: 하나의 학력 카드 보여주기 구현
// 본인 id 일 경우 편집 버튼 보이기
import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }) {
    return (
        <>
          <Card.Text>
            <Row className="align-items-center">
              <Col>
                <span>{education?.school}</span>
                <br />
                <span className="text-muted">{education?.major} ({education?.position})</span>
              </Col>
              {
                isEditable && (
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

export default EducationCard;