import React, { useState } from 'react';
import ProjectEditForm from './ProjectEditForm';
import ProjectCard from './ProjectCard';

function Project({ project, isEditable }) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ thisProject, setThisProject] = useState(project);

    return (
        <>
            {isEditing ? (
                <ProjectEditForm project={thisProject} setIsEditing={setIsEditing} setThisProject={setThisProject} />
            ) : (
                <ProjectCard project={thisProject} isEditable={isEditable} setIsEditing={setIsEditing} />
            )}
        </>
    )
}
export default Project;