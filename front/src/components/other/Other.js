import React, { useState } from "react";
import OtherEditForm from "./OtherEditForm";
import OtherCard from "./OtherCard";

function Other({ Other, isEditable, setOthers }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <OtherEditForm
                    Other={Other}
                    setIsEditing={setIsEditing}
                    setOthers={setOthers}
                />
            ) : (
                Other && (
                    <OtherCard
                        Other={Other}
                        isEditable={isEditable}
                        setIsEditing={setIsEditing}
                        setOthers={setOthers}
                    />
                )
            )}
        </>
    );
}

export default Other;
