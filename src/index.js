import {projectForm} from './form/project-form.js';
import {taskForm} from './form/task-form.js';

const allTasks_array = [
    {title: 'test 1', desc: 'test 1', date: '2022-05-25', prior: 'priority-low'},
    {title: 'test 2', desc: 'test 2', date: '2022-05-27', prior: 'priority-high'}
];
const doneTasks_array = [];
const todayTasks_array = [];
const allProjects_array = [{name: "All tasks", color: "black", details: "Find all tasks here", relatedTasks:allTasks_array}];

const projectFactory = (name, color, details) => {
    const addATask = (task) => {
        relatedTasks.unshift(task);
    }
    const relatedTasks = [];
    return {name, color, details, relatedTasks, addATask};
}

const taskFactory = (title, desc, date, prior, project) => {
    return {title, desc, date, prior, project}
}

const Logic = (() => {
    const createNewProject = (name, color, details) => {
        const newProject = projectFactory(name, color, details);
        const parentEl = document.querySelector('.projects-list');

        UI.displayElement(newProject, parentEl);

        if(name==="All tasks") {return}

        _addProjectToArray(newProject);
    }

    const _addProjectToArray = (project) => {
        allProjects_array.push(project);
    }

    const addTaskToArray = (task, project) => {
        const index = allProjects_array.indexOf(project);

        if(index === 0) {
            allProjects_array[index].relatedTasks.push(task);
        } else {
            allProjects_array[0].relatedTasks.push(task);
            allProjects_array[index].relatedTasks.push(task);
            console.log(allProjects_array[index].relatedTasks);
        }
        
    }

    const deleteTask = (taskElement, taskObject)=> {
        const taskContainer = document.querySelector('#main');
        generalTasksArray.splice(generalTasksArray.indexOf(taskObject), 1);
    }

    return {createNewProject, addTaskToArray}
})();

const UI = (() => {

    const openForm = (type, project) => {
        if (type === 'project') {
            const overlay = document.querySelector('#overlay-project');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = projectForm;
        } else if (type === 'task') {
            const overlay = document.querySelector('#overlay-task');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = taskForm;
            overlay.relatedProject = project;
            console.log(overlay.relatedProject);
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
        return projectEl
    }

    const displayElement = (project, parent)=> {
        parent.appendChild(_createProjectElement(project));
    };

    const displayProjectList = (project) => {
        const title = document.querySelector('.chosen-list-title');
        const details = document.querySelector('.project-details');
        title.textContent = project.name;
        details.textContent = project.details;
        _displayOnlyAddTaskButton(project);
        _displayFilteredTasks(project.relatedTasks);
    }

    //Start: Controls tasks

    const _displayFilteredTasks = (tasksArray, status)=> {
        tasksArray.forEach(task=>{
            addTaskToList(task, status);
        });
    };

    const addTaskToList = (task, status)=> {
        const taskContainer = document.querySelector('#main');

        const task_div = document.createElement('div');

        if(status === undefined) {
            task_div.classList.add('task-item', task.prior);
        } else {
            task_div.classList.add('task-item', task.prior, status);
        }


        task_div.innerHTML = `
            <div class="check-btn btn-pointer"></div>
            <div class="main-task-infos">
                <div class="task-title">${task.title}</div>
                <div class="details">${task.desc}</div>
            </div>
            <div class="date">${task.date}</div>
            <div class="delete-btn btn-pointer"></div>
        `
        //Eu associei um objeto à um elemento html. Isso vai permitir que eu retire o objeto da array e o elemento do DOM.
        task_div.objectAssign = task;

        taskContainer.prepend(task_div);
    }

    const _clearTaskDisplay = () => {
        document.querySelector('#main').innerHTML = '';
    }

    const _displayOnlyAddTaskButton = (project) => {
        _clearTaskDisplay();
        const add_button = document.createElement('div');
        add_button.classList.add('new-task-card', 'btn-pointer')
        add_button.innerHTML = `<img class="new-task-btn" src="./assets/add.png" alt="plus icon">Add a Task`;
        add_button.relatedProject = project;
        document.querySelector('#main').appendChild(add_button);
    }
    //Finish: Controls tasks

    return {openForm, closeForm, displayElement, displayProjectList, addTaskToList}
})();

//Events tab

//Send info to create a new project
document.querySelector('#overlay-project').addEventListener('submit', (e)=>{
    e.preventDefault();

    const projectName = document.querySelector('#new-project--name').value;
    const projectColor = document.querySelector('#new-project--color').value;
    const projectDetails = document.querySelector('#new-project--desc').value;

    Logic.createNewProject(projectName, projectColor, projectDetails);

    UI.closeForm('project');
});

//Event: Display everything necessarty when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    //Display all existing projects
    allProjects_array.forEach((project)=>{
        UI.displayElement(project, document.querySelector('.projects-list'))
    })
    //Open the page with the "All tasks" selected
    UI.displayProjectList(allProjects_array[0]);
});

//Event: Open the project list of tasks
document.querySelector('.projects-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        UI.displayProjectList(e.target.obj_ID);
    };
});

//Event: Open project form
document.querySelector('.new-list-btn').addEventListener('click', () => {
    UI.openForm('project');
});

//Event: Close project form
document.querySelector('#overlay-project').addEventListener('click', (e) => {
    if(e.target.id === 'close-form-btn'){
        UI.closeForm('project');
    }
});

//Event: Close task form
document.querySelector('#overlay-task').addEventListener('click', (e) => {
    if(e.target.id === 'close-form-btn'){
        UI.closeForm('task');
    }
});

//Event: Open task form
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-task-card')) {
        UI.openForm('task', e.target.relatedProject);
        console.log(e.target.relatedProject);
    }
});

//Event: Create a new task
document.querySelector('#overlay-task').addEventListener("submit", (e)=>{
    e.preventDefault();

    const relatedProject = document.querySelector('#overlay-task').relatedProject;

    const title = document.querySelector('#new-todo--title').value;
    const desc = document.querySelector('#new-todo--description').value;
    const date = document.querySelector('#new-todo--date').value;
    const prior = document.querySelector('input[type="radio"]:checked').value;
    const project = relatedProject;

    const newTask = taskFactory(title, desc, date, prior, project);

    UI.addTaskToList(newTask);
    Logic.addTaskToArray(newTask, relatedProject);
    UI.closeForm('task');

    console.log(newTask);
})

document.addEventListener('click', (e) => {
    console.log(e.target.relatedProject);
})

