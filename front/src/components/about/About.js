import React, { useState } from "react";
import AboutEditForm from "./AboutEditForm";
import AboutCard from "./AboutCard";

function About({ userAbout, setUserAbout, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);

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
