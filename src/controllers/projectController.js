import { projectFactory }  from '../factories/projectFactory.js';

export const projectController = () => {

    const projectsList = [];

    const addProject = (title, color) => {
        const project = projectFactory(title, color);
        projectsList.push(project);
    }

    const getProjectsList = () => projectsList;

    const getProjectById = (projId) =>
        projectsList.find(proj => proj.getId() === projId);

    const deleteProject = (projId) => {
        const projIndex = projectsList.findIndex(proj => proj.getId() === projId);
        projectsList.splice(projIndex, 1);
    }

    return {
        addProject, getProjectsList, getProjectById, deleteProject
    }
}