import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import About from "./About";
import AboutAddForm from "./AboutAddForm";

// import * as Api from "../../api";

function Abouts({ portfolioOwnerId, isEditable }) {
    //! 테스트용 더미
    const dummy = {
        blog: "http://elice-project.test",
        skill: ["javascript", "node.js", "express", "react"],
        position: "웹 백엔드",
        hobby: "에러 디버깅",
    };

    const [userAbout, setUserAbout] = useState(dummy);

    // useEffect(() => {
    //     Api.get("abouts", portfolioOwnerId).then(
    //         (res) => setUserAbout(res.data),
    //     ).catch((err) => {
    //          setUserAbout(null)
    //     })
    // }, [portfolioOwnerId]);

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: "25rem" }}>
            <Card.Body>
                {userAbout ? (
                    <About
                        userAbout={userAbout}
                        setUserAbout={setUserAbout}
                        isEditable={isEditable}
                    />
                ) : isEditable ? (
                    <AboutAddForm setUserAbout={setUserAbout} />
                ) : (
                    <Card.Text className="text-center">
                        아직 설정하지 않았습니다.
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}

export default Abouts;
