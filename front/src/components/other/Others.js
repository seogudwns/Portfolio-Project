import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Other from "./Other";
import OtherAddForm from "./OtherAddForm";
import * as Api from "../../api";

function Others({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [others, setOthers] = useState([]);

    useEffect(() => {
        Api.get("otherlist", portfolioOwnerId).then((res) => {
            setOthers(res.data);
        });
    }, [portfolioOwnerId]);

    const otherlist = others.map((other) => {
        return (
            <Other
                other={other}
                isEditable={isEditable}
                setOthers={setOthers}
            />
        );
    });

    return (
        <Card>
            <Card.Body>
                <Card.Title>기타활동</Card.Title>
                {otherlist}
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
                    <OtherAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setIsAdding={setIsAdding}
                        setOthers={setOthers}
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default Others;
