import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Other from "./Other";
import OtherAddForm from "./OtherAddForm";
import * as Api from "../../api";
import ThemeContext  from "../Theme";

function Others({ portfolioOwnerId, isEditable }) {
    const [isAdding, setIsAdding] = useState(false);
    const [others, setOthers] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        Api.get("others/list", portfolioOwnerId).then((res) => {
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
            <Card.Body className={`${theme}`} style={{borderRadius:"0.25rem"}}>
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
