import React from 'react';
import AddProject from './AddProject';
import Project from './Project';

const Projects = ({ projects }) => {
    return (
      <div className="project-list">
        <AddProject />
        <h1 className='project-list-title'>Projects</h1>
        <ul>
          {projects.map(project => {
            return (
              <Project key={project.id} project={project}/>
            );
          })}
        </ul>
      </div>
    );
}

export default Projects;