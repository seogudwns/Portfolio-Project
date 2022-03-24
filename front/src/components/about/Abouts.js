import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import About from "./About";
import AboutAddForm from "./AboutAddForm";

import * as Api from "../../api";

function Abouts({ portfolioOwnerId, isEditable }) {
    const [userAbout, setUserAbout] = useState(null);
    cosnt[(isValidAbout, setIsValidAbout)] = useState(false);

    useEffect(() => {
        Api.get("abouts", portfolioOwnerId).then(
            (res) => setUserAbout(res.data),
            setIsValidAbout(true),
        );
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                {isValidAbout ? (
                    <About
                        userAbout={userAbout}
                        setUserAbout={setUserAbout}
                        isEditable={isEditable}
                    />
                ) : isEditable ? (
                    <AboutAddForm />
                ) : (
                    <Card.Text className="text-center">
                        아직 사용자가 설정하지 않았습니다.
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}
