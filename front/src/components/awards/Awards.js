import React, { useState, useEffect } from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from './AwardAddForm';
import Award from './Award';
import * as Api from "../../api";



function Awards({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [awards, setAwards] = useState([]);

    const awardList = awards.map((award) => <Award award={award} isEditable={isEditable} setAwards={setAwards} />)
    useEffect(() => {
        Api.get(`awards`, portfolioOwnerId).then((res) => {
            let data = [];
            data.push(res.data);
            setAwards(data)
        });
    }, [portfolioOwnerId]);

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: "72rem" }}>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {awardList}
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsAdding(true)}
                                >
                                    +
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}
                {isAdding && (
                    <AwardAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setIsAdding={setIsAdding}
                        setAwards={setAwards}
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default Awards;