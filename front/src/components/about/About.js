import React, { useState, useEffect } from "react";
import AboutEditForm from "./AboutEditForm";
import AboutCard from "./AboutCard";
import * as Api from "../../api";

function About({ portfolioOwnerId, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);
    const [userAbout, setUserAbout] = useState(null);

    useEffect(() => {
        Api.get("abouts", portfolioOwnerId).then((res) =>
            setUserAbout(res.data),
        );
    }, [portfolioOwnerId]);

    return (
        <>
            {isEditing ? (
                <AboutEditForm
                    userAbout={userAbout}
                    setIsEditing={setIsEditing}
                    setUserAbout={setUserAbout}
                />
            ) : (
                <AboutCard
                    userAbout={userAbout}
                    setIsEditing={setIsEditing}
                    isEditable={isEditable}
                />
            )}
        </>
    );
}

export default About;
