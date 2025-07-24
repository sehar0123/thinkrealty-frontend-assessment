import React from 'react';

import { selectProject } from '../store/landingPageSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';
import type { Project } from '../types';

interface ProjectSelectorProps {
  projects: Project[];
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects }) => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(state => state.landingPage.selectedProject);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    const project = projects.find(p => p.project_id === parseInt(projectId));
    if (project) {
      dispatch(selectProject(project));
    }
  };

  return (
    <div className="card-gradient">
      <h2 className="text-2xl font-semibold mb-4 tracking-tight">Select a Project</h2>
      <div className="select-wrapper">
        <select
          className=" w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          value={selectedProject?.project_id || ''}
          onChange={handleSelect}
        >
          <option value="" className="text-gray-500" disabled>
            Choose a project
          </option>
          {projects.map(project => (
            <option
              key={project.project_id}
              value={project.project_id}
              className="text-gray-800 font-medium"
              disabled={selectedProject?.project_id === project.project_id}
            >
              {project.project_name}
            </option>
          ))}
        </select>
      </div>
      {projects.length === 0 && (
        <p className="mt-3 text-sm text-gray-200">No projects available. Please check back later.</p>
      )}
    </div>
  );
};

export default ProjectSelector;