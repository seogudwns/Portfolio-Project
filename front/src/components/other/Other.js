import React, { useState } from "react";
import OtherEditForm from "./OtherEditForm";
import OtherCard from "./OtherCard";

function Other({ other, isEditable, setOthers }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <OtherEditForm
                    other={other}
                    setIsEditing={setIsEditing}
                    setOthers={setOthers}
                />
            ) : (
                <OtherCard
                    other={other}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setOthers={setOthers}
                />
            )}
        </>
    );
}

export default Other;
