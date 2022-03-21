import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

function Project({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [thisProject, setThisProject] = useState(project);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={thisProject}
          setIsEditing={setIsEditing}
          setThisProject={setThisProject}
        />
      ) : (
        thisProject && (
          <ProjectCard
            project={thisProject}
            isEditable={isEditable}
            setIsEditing={setIsEditing}
            setThisProject={setThisProject}
          />
        )
      )}
    </>
  );
}
export default Project;
