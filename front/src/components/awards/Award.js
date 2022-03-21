import React, { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";

function Award({ award, isEditable, setAwards }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setIsEditing={setIsEditing}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setAwards={setAwards}
        />
      )}
    </>
  );
}

export default Award;
