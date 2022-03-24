// TODO: isEditing 변수에 따라 EducationCard 컴포넌트만 혹은 EducatinoEditForm 컴포넌트까지 보여주기 구현
import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, isEditable, setEducations }) {
    /**
     * useState 훅으로 isEditing 상태를 생성하여, 편집 폼을 나타낼지 말지 결정
     */
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {!isEditing ? (
                <EducationCard
                    education={education}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setEducations={setEducations}
                />
            ) : (
                <EducationEditForm
                    setIsEditing={setIsEditing}
                    education={education}
                    setEducations={setEducations}
                />
            )}
        </>
    );
}

export default Education;
