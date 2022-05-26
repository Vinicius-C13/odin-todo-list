import {projectForm} from './form/project-form.js';
import {taskForm} from './form/task-form.js';

//This is just temporary - remove as soon as possible;
function displayForm () {
    const form = document.createElement('div');
    form.innerHTML = projectForm;
    document.getElementById('main').appendChild(form);
};
displayForm();

const allTasks_array = [];
const doneTasks_array = [];
const todayTasks_array = [];
const allProjects_array = [];

const projectFactory = (name) => {
    return {name}
}

const Logic = (()=>{
    const createNewProject = (name) => {
        const newProject = projectFactory(name);

        _addProjectToArray(newProject);

        UI.displayProject(newProject);
    }

    const _addProjectToArray = (project) => {
        allProjects_array.push(project);
        console.log(allProjects_array);
    }

    return {createNewProject}
})();

const UI = (()=>{

    const displayProject = (project)=> {
        console.log(project);
    };
    return {displayProject}
})();

//Events tab
document.querySelector('#project-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const projectName = document.querySelector('#new-project--name').value;

    Logic.createNewProject(projectName);
});