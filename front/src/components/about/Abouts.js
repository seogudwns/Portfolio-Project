import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import About from "./About";
import AboutAddForm from "./AboutAddForm";

import * as Api from "../../api";
import ThemeContext  from "../Theme";

function Abouts({ portfolioOwnerId, isEditable }) {
    const [userAbout, setUserAbout] = useState(null);
    const { theme } = useContext(ThemeContext);

    function isEmptyArray(arr) {
        if (Array.isArray(arr) && arr.legnth === 0) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        Api.get("abouts/list", portfolioOwnerId)
            .then((res) => {
                isEmptyArray(res.data)
                    ? setUserAbout(res.data.at(-1))
                    : setUserAbout(null);
            })
            .catch((err) => {
                setUserAbout(null);
            });
    }, [portfolioOwnerId]);

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: "25rem" }}>
            <Card.Body className={`${theme}`} style={{borderRadius:"0.25rem"}}>
                {userAbout ? (
                    <About
                        userAbout={userAbout}
                        setUserAbout={setUserAbout}
                        isEditable={isEditable}
                    />
                ) : isEditable ? (
                    <AboutAddForm
                        setUserAbout={setUserAbout}
                        userId={portfolioOwnerId}
                    />
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
