import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

function Project({ project, isEditable, setProjects }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <ProjectEditForm
                    project={project}
                    setIsEditing={setIsEditing}
                    setProjects={setProjects}
                />
            ) : (
                project && (
                    <ProjectCard
                        project={project}
                        isEditable={isEditable}
                        setIsEditing={setIsEditing}
                        setProjects={setProjects}
                    />
                )
            )}
        </>
    );
}
export default Project;
