import {projectForm} from './form/project-form.js';
import {taskForm} from './form/task-form.js';

//This is just temporary - remove as soon as possible;

const allTasks_array = [];
const doneTasks_array = [];
const todayTasks_array = [];
const allProjects_array = [];

const projectFactory = (name, color, details) => {
    const addATask = (task) => {
        relatedTasks.unshift(task);
    }
    const relatedTasks = ['pirilampos'];
    return {name, color, details, relatedTasks, addATask};
}

const Logic = (() => {
    const createNewProject = (name, color, details) => {
        const newProject = projectFactory(name, color, details);
        const parentEl = document.querySelector('.projects-list');

        _addProjectToArray(newProject);

        UI.displayElement(newProject, parentEl);
    }

    const _addProjectToArray = (project) => {
        allProjects_array.push(project);
        console.log(allProjects_array);
    }

    return {createNewProject}
})();

const UI = (() => {

    const openForm = (type) => {
        if (type === 'project') {
            const overlay = document.querySelector('#overlay-project');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = projectForm;
        } else if (type === 'task') {
            const overlay = document.querySelector('#overlay-task');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = taskForm;
        }
    }

    const closeForm = (type) => {
        if (type === 'project') {
            const overlay = document.querySelector('#overlay-project');
            overlay.classList.remove('show-overlay');
            overlay.innerHTML = "";
        } else if (type === 'task') {
            const overlay = document.querySelector('#overlay-task');
            overlay.classList.remove('show-overlay');
            overlay.innerHTML = "";
        }
    }

    const _createProjectElement = (project) => {
        const projectEl = document.createElement('li');
        projectEl.classList.add('project-item', 'btn-pointer')
        projectEl.obj_ID = project;
        projectEl.innerHTML = `<div class= "project-color" style="background: ${project.color}"></div>${project.name}`;
        console.log(projectEl)
        return projectEl
    }

    const displayElement = (project, parent)=> {
        parent.prepend(_createProjectElement(project));
    };

    return {openForm, closeForm, displayElement}
})();

//Events tab
document.querySelector('#overlay-project').addEventListener('submit', (e)=>{
    e.preventDefault();

    const projectName = document.querySelector('#new-project--name').value;
    const projectColor = document.querySelector('#new-project--color').value;
    const projectDetails = document.querySelector('#new-project--desc').value;

    Logic.createNewProject(projectName, projectColor, projectDetails);

    UI.closeForm('project');
});

document.querySelector('.projects-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        e.target.obj_ID.addATask('teste');
    };
})

//Event: Open project form
document.querySelector('.new-list-btn').addEventListener('click', () => {
    UI.openForm('project');
    console.log('teste');
})

//Event: Close project form
document.querySelector('#overlay-project').addEventListener('click', (e) => {
    if(e.target.id === 'close-form-btn'){
        console.log('raraar')
        UI.closeForm('project');
    }
});