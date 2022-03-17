import React, { useState } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';

function Award({ award, isEditable, }) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ thisAward, setThisAward ] = useState(award);
    return (
        <>
        {isEditing ? (
            <AwardEditForm award={thisAward} setIsEditing={setIsEditing} setThisAward={setThisAward} />
        ) : (
            <AwardCard award={thisAward} isEditable={isEditable} setIsEditing={setIsEditing} />
        )}
        </>
    );
}

export default Award;
