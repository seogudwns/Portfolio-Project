import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from "./Award";
import * as Api from "../../api";
import ThemeContext from "../Theme";

function Awards({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [awards, setAwards] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        Api.get(`awards/list`, portfolioOwnerId).then((res) => {
            setAwards(res.data);
        });
    }, [portfolioOwnerId]);

    const awardList = awards.map((award) => (
        <Award award={award} isEditable={isEditable} setAwards={setAwards} />
    ));

    return (
        <Card className="mb-2">
            <Card.Body
                className={`${theme}`}
                style={{ borderRadius: "0.25rem" }}
            >
                <Card.Title className="component-name">수상이력</Card.Title>
                {awardList}
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
