import React, { useState, useEffect } from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from './AwardAddForm';
import Award from './Award';
import * as Api from "../../api";



function Awards({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        Api.get(`awardlist`, portfolioOwnerId).then((res) => {
            setAwards(res.data)
        });
    }, [portfolioOwnerId]);

    const awardList = awards.map((award) => <Award award={award} isEditable={isEditable} setAwards={setAwards} />)

    return (
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {awards && awardList}
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